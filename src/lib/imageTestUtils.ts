/**
 * Image Fallback Test Utilities for Car Wash Clean
 * Specialized for before/after gallery testing and external image validation
 */

export interface BeforeAfterImageTest {
  before: string;
  after: string;
  beforeValid: boolean;
  afterValid: boolean;
  loadTimes: {
    before?: number;
    after?: number;
  };
  errors: {
    before?: string;
    after?: string;
  };
}

/**
 * Test before/after image pairs commonly used in car wash galleries
 */
export const testBeforeAfterImages = async (
  pairs: Array<{ before: string; after: string }>
): Promise<BeforeAfterImageTest[]> => {
  const testPromises = pairs.map(async (pair) => {
    const beforeStartTime = Date.now();
    const afterStartTime = Date.now();

    const beforeTest = new Promise<{ isValid: boolean; error?: string; loadTime: number }>((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ isValid: true, loadTime: Date.now() - beforeStartTime });
      img.onerror = (error) => resolve({
        isValid: false,
        error: error.toString(),
        loadTime: Date.now() - beforeStartTime
      });
      img.src = pair.before;
    });

    const afterTest = new Promise<{ isValid: boolean; error?: string; loadTime: number }>((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ isValid: true, loadTime: Date.now() - afterStartTime });
      img.onerror = (error) => resolve({
        isValid: false,
        error: error.toString(),
        loadTime: Date.now() - afterStartTime
      });
      img.src = pair.after;
    });

    const [beforeResult, afterResult] = await Promise.all([beforeTest, afterTest]);

    return {
      before: pair.before,
      after: pair.after,
      beforeValid: beforeResult.isValid,
      afterValid: afterResult.isValid,
      loadTimes: {
        before: beforeResult.loadTime,
        after: afterResult.loadTime
      },
      errors: {
        before: beforeResult.error,
        after: afterResult.error
      }
    };
  });

  return Promise.all(testPromises);
};

/**
 * Test external image sources (like Unsplash) for reliability
 */
export const testExternalImageSources = async (
  imageUrls: string[]
): Promise<{
  url: string;
  isAccessible: boolean;
  responseTime: number;
  statusCode?: number;
  needsFallback: boolean;
}[]> => {
  const testPromises = imageUrls.map(async (url) => {
    const startTime = Date.now();

    try {
      // Test with HEAD request first (faster)
      const response = await fetch(url, {
        method: 'HEAD',
        mode: 'no-cors' // Handle CORS issues
      });

      return {
        url,
        isAccessible: response.ok,
        responseTime: Date.now() - startTime,
        statusCode: response.status,
        needsFallback: !response.ok
      };
    } catch (error) {
      // Fallback to image load test
      return new Promise<{
        url: string;
        isAccessible: boolean;
        responseTime: number;
        needsFallback: boolean;
      }>((resolve) => {
        const img = new Image();
        img.onload = () => resolve({
          url,
          isAccessible: true,
          responseTime: Date.now() - startTime,
          needsFallback: false
        });
        img.onerror = () => resolve({
          url,
          isAccessible: false,
          responseTime: Date.now() - startTime,
          needsFallback: true
        });
        img.src = url;
      });
    }
  });

  return Promise.all(testPromises);
};

/**
 * Generate comprehensive report for car wash gallery images
 */
export const generateGalleryReport = async (
  beforeAfterPairs: Array<{ before: string; after: string }>
): Promise<{
  totalPairs: number;
  validPairs: number;
  partiallyValidPairs: number;
  invalidPairs: number;
  averageLoadTime: number;
  externalImageIssues: number;
  recommendations: string[];
}> => {
  const results = await testBeforeAfterImages(beforeAfterPairs);

  const validPairs = results.filter(r => r.beforeValid && r.afterValid).length;
  const partiallyValidPairs = results.filter(r =>
    (r.beforeValid && !r.afterValid) || (!r.beforeValid && r.afterValid)
  ).length;
  const invalidPairs = results.filter(r => !r.beforeValid && !r.afterValid).length;

  const allLoadTimes = results.flatMap(r => [
    r.loadTimes.before || 0,
    r.loadTimes.after || 0
  ]).filter(time => time > 0);

  const averageLoadTime = allLoadTimes.length > 0
    ? allLoadTimes.reduce((sum, time) => sum + time, 0) / allLoadTimes.length
    : 0;

  const externalImageIssues = results.filter(r =>
    (r.before.includes('unsplash.com') && !r.beforeValid) ||
    (r.after.includes('unsplash.com') && !r.afterValid)
  ).length;

  const recommendations: string[] = [];

  if (invalidPairs > 0) {
    recommendations.push(`${invalidPairs} pairs are completely invalid. Implement fallback images.`);
  }

  if (partiallyValidPairs > 0) {
    recommendations.push(`${partiallyValidPairs} pairs are partially invalid. Check individual images.`);
  }

  if (externalImageIssues > 0) {
    recommendations.push(`${externalImageIssues} external image issues detected. Consider local hosting.`);
  }

  if (averageLoadTime > 3000) {
    recommendations.push('Slow loading detected. Consider image optimization or CDN.');
  }

  const validityRate = (validPairs / results.length) * 100;
  if (validityRate < 80) {
    recommendations.push('Low image validity rate. Review image sources and implement robust fallbacks.');
  }

  return {
    totalPairs: results.length,
    validPairs,
    partiallyValidPairs,
    invalidPairs,
    averageLoadTime,
    externalImageIssues,
    recommendations
  };
};

/**
 * Mock data generator for testing fallback scenarios
 */
export const createMockBeforeAfterData = (includeInvalidUrls: boolean = true) => {
  const baseData = [
    {
      before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800',
      after: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=800'
    },
    {
      before: '/images/placeholder-vehicle.svg',
      after: '/images/placeholder-vehicle.svg'
    }
  ];

  if (includeInvalidUrls) {
    baseData.push(
      {
        before: 'https://invalid-domain.com/before.jpg',
        after: 'https://invalid-domain.com/after.jpg'
      },
      {
        before: '',
        after: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800'
      }
    );
  }

  return baseData;
};

/**
 * Development helper for monitoring image fallbacks
 */
export const logBeforeAfterFallback = (
  type: 'before' | 'after',
  originalSrc: string,
  fallbackSrc: string,
  pairId: string
): void => {
  if (process.env.NODE_ENV === 'development') {
    console.group(`🔄 ${type.toUpperCase()} Image Fallback - Pair ${pairId}`);
    console.warn('Failed:', originalSrc);
    console.info('Using:', fallbackSrc);
    console.groupEnd();
  }
};