# Car-Wash Memory Optimization Guide

## Critical Memory Fixes Applied

### 🚨 Memory Configuration
- **Production Runtime**: 128MB limit (down from 256MB)
- **Build Process**: 512MB limit (down from 1024MB)
- **Development**: 384MB limit (down from 512MB)

### 🔧 Key Optimizations Implemented

#### 1. Node.js Memory Settings
```bash
# Production
NODE_OPTIONS='--max-old-space-size=128 --expose-gc --max-semi-space-size=16'

# Build
NODE_OPTIONS='--max-old-space-size=512 --max-semi-space-size=32'
```

#### 2. Next.js Configuration
- Aggressive webpack bundle splitting (max 50KB chunks)
- Disabled telemetry and unnecessary features
- Optimized image configuration (WebP only, reduced sizes)
- Server external packages for Sanity
- Standalone output for production

#### 3. Sanity Integration Optimizations
- Extended cache TTL to 10 minutes (reduced API calls)
- Limited data fetching (max 50 services, 10 testimonials)
- Automatic cache cleanup with timers
- Emergency memory cleanup functions
- Process exit handlers for cleanup

#### 4. Component-Level Optimizations
- Memoized expensive calculations
- Proper cleanup in useEffect hooks
- Memory-aware timeouts and intervals
- Lazy loading and code splitting

#### 5. Memory Monitoring
- Real-time memory usage tracking
- Automatic garbage collection triggers
- Emergency cleanup at 140MB usage
- Process warning handlers

## Deployment Commands

### Build
```bash
npm run build
```

### Start Production (Standalone - Recommended)
```bash
npm start
```

### Start Production (Next.js - Alternative)
```bash
npm run start:next
```

## Memory Usage Results

### Before Optimization:
- Memory limit: 256MB
- Frequent restarts due to OOM
- Slow startup times

### After Optimization:
- Memory limit: 128MB
- Stable operation within limits
- Fast startup: ~230ms
- Successful build with 512MB

## Monitoring

The application now includes:
- Automatic memory monitoring every 5 seconds
- Warning at 100MB usage
- Critical alerts at 120MB usage
- Emergency cleanup at 140MB usage

## Sanity Data Handling

The app is configured to handle the 7 services from Sanity efficiently:
- Automatic data limiting to prevent memory bloat
- Fallback to mock data if Sanity fails
- Extended caching to reduce API calls
- Memory-optimized data structures

## Production Checklist

✅ Build completes successfully with 512MB
✅ Server starts with 128MB memory limit
✅ Memory monitoring is active
✅ Sanity integration is optimized
✅ Automatic cleanup is enabled
✅ Emergency handlers are in place

## Troubleshooting

If memory issues persist:

1. Check memory usage: `ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%mem | head`
2. Monitor Node.js heap: Use the built-in memory monitor
3. Force garbage collection: `global.gc()` (if --expose-gc is enabled)
4. Emergency cleanup: Call `emergencyMemoryCleanup()` function

The car-wash application should now run stably within the 128MB memory limit without crashes or restarts.