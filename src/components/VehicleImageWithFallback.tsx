'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { Car, Sparkles } from 'lucide-react';

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
  type?: 'before' | 'after' | 'gallery' | 'service';
}

/**
 * Vehicle Image Component with car wash specific fallback handling
 * Optimized for before/after images and service gallery
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
  type = 'gallery'
}: VehicleImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    // Try to retry once for external images
    if (retryCount === 0 && (src.includes('unsplash.com') || src.startsWith('http'))) {
      setRetryCount(1);
      // Force reload by adding timestamp
      setImageSrc(`${src}${src.includes('?') ? '&' : '?'}retry=${Date.now()}`);
      return;
    }

    if (!hasError && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setHasError(true);
    }
    setIsLoading(false);
    onError?.();
  }, [hasError, imageSrc, fallbackSrc, onError, retryCount, src]);

  const imageProps = fill
    ? { fill: true, sizes }
    : { width: width || 800, height: height || 600 };

  const getPlaceholderContent = () => {
    switch (type) {
      case 'before':
        return (
          <div className="text-center text-gray-400">
            <Car className="mx-auto h-16 w-16 mb-2 opacity-60" />
            <p className="text-sm font-medium">Before Image</p>
            <p className="text-xs">Ennen kuvaa</p>
          </div>
        );
      case 'after':
        return (
          <div className="text-center text-gray-400">
            <div className="relative">
              <Car className="mx-auto h-16 w-16 mb-2" />
              <Sparkles className="absolute -top-1 -right-1 h-6 w-6 text-emerald-400" />
            </div>
            <p className="text-sm font-medium">After Image</p>
            <p className="text-xs text-emerald-600">Jälkeen kuvaa</p>
          </div>
        );
      case 'service':
        return (
          <div className="text-center text-gray-400">
            <div className="relative">
              <Car className="mx-auto h-16 w-16 mb-2" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full opacity-20" />
            </div>
            <p className="text-sm font-medium">Service Image</p>
            <p className="text-xs">Palvelukuva</p>
          </div>
        );
      default:
        return (
          <div className="text-center text-gray-400">
            <Car className="mx-auto h-16 w-16 mb-2" />
            <p className="text-sm">Vehicle Image</p>
          </div>
        );
    }
  };

  return (
    <div className={`relative overflow-hidden bg-gray-100 ${className}`}>
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
          <div className="text-gray-400">
            <Car className="h-12 w-12 animate-bounce" />
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
      />

      {/* Error state with contextual icon */}
      {hasError && showPlaceholderIcon && imageSrc === fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
          {getPlaceholderContent()}
        </div>
      )}

      {/* Loading overlay for external images */}
      {isLoading && retryCount > 0 && (
        <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
          Retrying...
        </div>
      )}
    </div>
  );
}

// Utility for handling before/after image pairs
export const createBeforeAfterImagePair = (beforeSrc: string, afterSrc: string) => ({
  before: beforeSrc || '/images/placeholder-vehicle.svg',
  after: afterSrc || '/images/placeholder-vehicle.svg'
});

// Utility for validating external image URLs
export const isValidImageUrl = (url: string): boolean => {
  if (!url) return false;

  const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
  const hasValidExtension = validExtensions.some(ext =>
    url.toLowerCase().includes(ext)
  );

  return hasValidExtension || url.includes('unsplash.com') || url.includes('images.');
};