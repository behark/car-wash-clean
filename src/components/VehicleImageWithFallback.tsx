'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Car, Sparkles, AlertCircle } from 'lucide-react';

type ImageType = 'before' | 'after' | 'gallery' | 'service';

interface VehicleImageWithFallbackProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fallbackSrc?: string;
  showPlaceholderIcon?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  type?: ImageType;
  /** Enable automatic retry for external images */
  enableRetry?: boolean;
  /** Maximum retry attempts */
  maxRetries?: number;
}

/**
 * Vehicle Image Component with car wash specific fallback handling
 * Optimized for before/after images and service gallery with automatic retry
 */
export default function VehicleImageWithFallback({
  src,
  alt,
  fill = false,
  width,
  height,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority = false,
  fallbackSrc = '/images/placeholder-vehicle.svg',
  showPlaceholderIcon = true,
  onLoad,
  onError,
  type = 'gallery',
  enableRetry = true,
  maxRetries = 2
}: VehicleImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  // Reset state when src changes
  useEffect(() => {
    setImageSrc(src);
    setHasError(false);
    setIsLoading(true);
    setRetryCount(0);
  }, [src]);

  const isExternalImage = useCallback((url: string) => {
    return url.startsWith('http') || url.includes('unsplash.com') || url.includes('images.');
  }, []);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    console.error(`Image failed to load: ${imageSrc}, retry count: ${retryCount}`);

    // Try to retry for external images
    if (enableRetry && retryCount < maxRetries && isExternalImage(src)) {
      console.log(`Retrying image load (attempt ${retryCount + 1}/${maxRetries})`);
      setRetryCount(prev => prev + 1);
      
      // Wait a bit before retrying
      setTimeout(() => {
        // Force reload by updating state (Next.js Image will re-fetch)
        setImageSrc(src);
      }, 500 * (retryCount + 1)); // Exponential backoff
      
      return;
    }

    // All retries exhausted or retry disabled, use fallback
    if (!hasError && imageSrc !== fallbackSrc) {
      console.log(`Using fallback image: ${fallbackSrc}`);
      setImageSrc(fallbackSrc);
      setHasError(true);
    }
    
    setIsLoading(false);
    onError?.();
  }, [hasError, imageSrc, fallbackSrc, onError, retryCount, src, enableRetry, maxRetries, isExternalImage]);

  const imageProps = fill
    ? { fill: true, sizes }
    : { width: width || 800, height: height || 600 };

  const getPlaceholderContent = () => {
    const placeholders: Record<ImageType, JSX.Element> = {
      before: (
        <div className="text-center text-gray-400">
          <Car className="mx-auto h-12 sm:h-16 w-12 sm:w-16 mb-2 opacity-60" />
          <p className="text-xs sm:text-sm font-medium">Ennen</p>
          <p className="text-xs opacity-60">Before</p>
        </div>
      ),
      after: (
        <div className="text-center text-gray-400">
          <div className="relative inline-block">
            <Car className="mx-auto h-12 sm:h-16 w-12 sm:w-16 mb-2" />
            <Sparkles className="absolute -top-1 -right-1 h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
          </div>
          <p className="text-xs sm:text-sm font-medium text-emerald-600">Jälkeen</p>
          <p className="text-xs opacity-60">After</p>
        </div>
      ),
      service: (
        <div className="text-center text-gray-400">
          <div className="relative inline-block">
            <Car className="mx-auto h-12 sm:h-16 w-12 sm:w-16 mb-2" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-20 blur-sm" />
          </div>
          <p className="text-xs sm:text-sm font-medium">Palvelukuva</p>
          <p className="text-xs opacity-60">Service</p>
        </div>
      ),
      gallery: (
        <div className="text-center text-gray-400">
          <Car className="mx-auto h-12 sm:h-16 w-12 sm:w-16 mb-2" />
          <p className="text-xs sm:text-sm">Galleriakuva</p>
          <p className="text-xs opacity-60">Gallery Image</p>
        </div>
      )
    };

    return placeholders[type];
  };

  return (
    <div className={`relative overflow-hidden bg-gray-100 ${className}`}>
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400">
            <Car className="h-10 w-10 sm:h-12 sm:w-12 animate-bounce" />
          </div>
        </div>
      )}

      {/* Image */}
      <Image
        src={imageSrc}
        alt={alt}
        {...imageProps}
        className={`transition-all duration-500 ${
          isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
        } ${fill ? 'object-cover' : ''}`}
        priority={priority}
        onLoad={handleLoad}
        onError={handleError}
        unoptimized={isExternalImage(imageSrc)} // Don't optimize external images
      />

      {/* Error state with contextual icon */}
      {hasError && showPlaceholderIcon && imageSrc === fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
          {getPlaceholderContent()}
        </div>
      )}

      {/* Retry indicator */}
      {isLoading && retryCount > 0 && retryCount < maxRetries && (
        <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <AlertCircle className="w-3 h-3" />
          <span>Ladataan... ({retryCount}/{maxRetries})</span>
        </div>
      )}

      {/* Failed after retries indicator */}
      {hasError && retryCount >= maxRetries && (
        <div className="absolute bottom-2 left-2 right-2 bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full text-center shadow-sm">
          Kuvan lataus epäonnistui
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Create a before/after image pair with fallbacks
 */
export const createBeforeAfterImagePair = (
  beforeSrc: string, 
  afterSrc: string,
  fallback: string = '/images/placeholder-vehicle.svg'
) => ({
  before: beforeSrc || fallback,
  after: afterSrc || fallback
});

/**
 * Validate if a URL is a valid image URL
 */
export const isValidImageUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;

  const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];
  const validDomains = ['unsplash.com', 'images.', 'img.'];

  const hasValidExtension = validExtensions.some(ext =>
    url.toLowerCase().includes(ext)
  );

  const hasValidDomain = validDomains.some(domain =>
    url.toLowerCase().includes(domain)
  );

  return hasValidExtension || hasValidDomain;
};

/**
 * Get optimized image sizes based on viewport
 */
export const getImageSizes = (type: ImageType): string => {
  const sizeConfigs: Record<ImageType, string> = {
    before: '(max-width: 768px) 50vw, (max-width: 1024px) 40vw, 30vw',
    after: '(max-width: 768px) 50vw, (max-width: 1024px) 40vw, 30vw',
    service: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
    gallery: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
  };

  return sizeConfigs[type];
};

/**
 * Check if image should be lazy loaded based on position
 */
export const shouldPrioritize = (index: number, viewportImages: number = 6): boolean => {
  // Prioritize first viewport of images
  return index < viewportImages;
};
