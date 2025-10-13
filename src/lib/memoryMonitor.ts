// Memory monitoring and cleanup utilities for ultra-low memory environments
import React from 'react';

let memoryWarnings = 0;
let lastCleanup = Date.now();

interface MemoryUsage {
  used: number;
  total: number;
  percentage: number;
}

// Memory thresholds (in MB)
const MEMORY_THRESHOLDS = {
  WARNING: 100, // 100MB
  CRITICAL: 120, // 120MB
  EMERGENCY: 140, // 140MB - near the 128MB limit
};

// Get current memory usage (Node.js only)
export function getMemoryUsage(): MemoryUsage | null {
  if (typeof process === 'undefined') return null;

  const usage = process.memoryUsage();
  const used = Math.round(usage.rss / 1024 / 1024); // Convert to MB
  const heapUsed = Math.round(usage.heapUsed / 1024 / 1024);

  return {
    used: Math.max(used, heapUsed),
    total: 128, // Our limit
    percentage: (Math.max(used, heapUsed) / 128) * 100
  };
}

// Check if memory usage is critical
export function isMemoryCritical(): boolean {
  const usage = getMemoryUsage();
  return usage ? usage.used > MEMORY_THRESHOLDS.CRITICAL : false;
}

// Force aggressive garbage collection
export function forceGarbageCollection(): void {
  if (typeof global !== 'undefined' && global.gc) {
    global.gc();
  }

  // Also try to trigger GC through memory pressure
  if (typeof process !== 'undefined') {
    process.nextTick(() => {
      // Create and immediately release memory pressure
      const temp = new Array(1000).fill(null);
      temp.length = 0;
    });
  }
}

// Emergency memory cleanup
export async function emergencyMemoryCleanup(): Promise<void> {
  console.warn('🚨 Emergency memory cleanup initiated');

  // Import cleanup functions dynamically to avoid loading them in memory
  try {
    const { cleanupSanityCache, emergencyMemoryCleanup } = await import('./sanity');
    emergencyMemoryCleanup();
  } catch (error) {
    console.error('Error during emergency cleanup:', error);
  }

  // Force multiple GC cycles
  for (let i = 0; i < 3; i++) {
    forceGarbageCollection();
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  lastCleanup = Date.now();
}

// Monitor memory usage and trigger cleanups
export function startMemoryMonitoring(): NodeJS.Timeout | null {
  if (typeof setInterval === 'undefined') return null;

  return setInterval(async () => {
    const usage = getMemoryUsage();
    if (!usage) return;

    const timeSinceCleanup = Date.now() - lastCleanup;

    if (usage.used > MEMORY_THRESHOLDS.EMERGENCY) {
      await emergencyMemoryCleanup();
      memoryWarnings++;
    } else if (usage.used > MEMORY_THRESHOLDS.CRITICAL && timeSinceCleanup > 30000) {
      console.warn(`⚠️ Memory usage critical: ${usage.used}MB (${usage.percentage.toFixed(1)}%)`);
      forceGarbageCollection();
      lastCleanup = Date.now();
    } else if (usage.used > MEMORY_THRESHOLDS.WARNING && timeSinceCleanup > 60000) {
      console.log(`📊 Memory usage: ${usage.used}MB (${usage.percentage.toFixed(1)}%)`);
      forceGarbageCollection();
      lastCleanup = Date.now();
    }
  }, 5000); // Check every 5 seconds
}

// Stop memory monitoring
export function stopMemoryMonitoring(intervalId: NodeJS.Timeout): void {
  if (intervalId) {
    clearInterval(intervalId);
  }
}

// Memory-aware component wrapper
export function withMemoryMonitoring<T extends object>(Component: React.ComponentType<T>) {
  return function MemoryMonitoredComponent(props: T) {
    React.useEffect(() => {
      const intervalId = startMemoryMonitoring();

      return () => {
        if (intervalId) {
          stopMemoryMonitoring(intervalId);
        }
      };
    }, []);

    return React.createElement(Component, props);
  };
}

// Optimized setTimeout that cleans up automatically
export function memoryAwareTimeout(callback: () => void, delay: number): NodeJS.Timeout {
  const timeoutId = setTimeout(() => {
    callback();
    // Immediate cleanup after execution
    forceGarbageCollection();
  }, delay);

  return timeoutId;
}

// Export memory statistics
export function getMemoryStats(): string {
  const usage = getMemoryUsage();
  if (!usage) return 'Memory monitoring not available';

  return `Memory: ${usage.used}MB/${usage.total}MB (${usage.percentage.toFixed(1)}%) | Warnings: ${memoryWarnings}`;
}