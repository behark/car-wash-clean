'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Star,
  Clock,
  Car,
  Sparkles,
  X,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

interface BeforeAfterImage {
  id: string;
  before: string;
  after: string;
  title: string;
  titleFi: string;
  description: string;
  descriptionFi: string;
  service: string;
  serviceFi: string;
  duration: string;
  rating: number;
  category: 'basic' | 'premium' | 'detail' | 'restoration';
}

const beforeAfterImages: BeforeAfterImage[] = [
  {
    id: '1',
    before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop',
    after: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=800&auto=format&fit=crop',
    title: 'Complete Car Transformation',
    titleFi: 'Täydellinen Auton Muodonmuutos',
    description: 'From dusty and neglected to showroom condition',
    descriptionFi: 'Pölyisestä ja laiminlyödystä näyttelysalin kuntoon',
    service: 'Premium Detail Service',
    serviceFi: 'Premium Yksityiskohtainen Palvelu',
    duration: '90 min',
    rating: 5,
    category: 'premium'
  },
  {
    id: '2',
    before: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=800&auto=format&fit=crop',
    after: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800&auto=format&fit=crop',
    title: 'Interior Deep Clean',
    titleFi: 'Sisätilojen Syvapesu',
    description: 'Professional interior restoration and sanitization',
    descriptionFi: 'Ammattimainen sisätilojen kunnostus ja desinfioiminen',
    service: 'Interior Detail',
    serviceFi: 'Sisätilojen Yksityiskohdat',
    duration: '60 min',
    rating: 5,
    category: 'detail'
  },
  {
    id: '3',
    before: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=800&auto=format&fit=crop',
    after: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=800&auto=format&fit=crop',
    title: 'SUV Complete Makeover',
    titleFi: 'Maastoauton Täydellinen Muodonmuutos',
    description: 'Large vehicle specialist cleaning and protection',
    descriptionFi: 'Suurten ajoneuvojen erikoispesu ja suojaus',
    service: 'SUV Premium Wash',
    serviceFi: 'Maastoauton Premium Pesu',
    duration: '75 min',
    rating: 4.9,
    category: 'premium'
  },
  {
    id: '4',
    before: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=800&auto=format&fit=crop',
    after: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop',
    title: 'Engine Bay Detailing',
    titleFi: 'Moottoritilan Yksityiskohtainen Puhdistus',
    description: 'Complete engine compartment cleaning and protection',
    descriptionFi: 'Täydellinen moottoritilan puhdistus ja suojaus',
    service: 'Engine Detail',
    serviceFi: 'Moottorin Yksityiskohdat',
    duration: '45 min',
    rating: 4.8,
    category: 'detail'
  },
  {
    id: '5',
    before: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800&auto=format&fit=crop',
    after: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop',
    title: 'Classic Car Restoration',
    titleFi: 'Klassikkoauton Kunnostus',
    description: 'Vintage vehicle brought back to original glory',
    descriptionFi: 'Vintage-ajoneuvo palautettu alkuperäiseen loistoonsa',
    service: 'Classic Restoration',
    serviceFi: 'Klassikkokunnostus',
    duration: '120 min',
    rating: 5,
    category: 'restoration'
  },
  {
    id: '6',
    before: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop',
    after: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=800&auto=format&fit=crop',
    title: 'Basic Wash Excellence',
    titleFi: 'Peruspesu Erinomaisuus',
    description: 'Even our basic service delivers amazing results',
    descriptionFi: 'Jopa peruspalvelumme tuottaa hämmästyttäviä tuloksia',
    service: 'Basic Wash',
    serviceFi: 'Pesupalvelu',
    duration: '30 min',
    rating: 4.7,
    category: 'basic'
  }
];

export default function BeforeAfterGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  const categories = [
    { id: 'all', label: 'Kaikki', labelEn: 'All' },
    { id: 'basic', label: 'Peruspesu', labelEn: 'Basic' },
    { id: 'premium', label: 'Premium', labelEn: 'Premium' },
    { id: 'detail', label: 'Yksityiskohdat', labelEn: 'Detail' },
    { id: 'restoration', label: 'Kunnostus', labelEn: 'Restoration' }
  ];

  const filteredImages = selectedCategory === 'all'
    ? beforeAfterImages
    : beforeAfterImages.filter(img => img.category === selectedCategory);

  const currentImage = filteredImages[currentIndex] || filteredImages[0];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setSliderPosition(pos => {
          if (pos >= 90) return 10;
          return pos + 2;
        });
      }, 100);
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
    setSliderPosition(50);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
    setSliderPosition(50);
  };

  const resetSlider = () => {
    setSliderPosition(50);
    setIsAutoPlaying(false);
  };

  if (!currentImage) return null;

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ennen & Jälkeen
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Katso uskomattomia muutoksia - todellisia tuloksia tyytyväisiltä asiakkailtamme
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setCurrentIndex(0);
                  setSliderPosition(50);
                }}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedCategory === category.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-emerald-50'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main Gallery */}
        <div className="max-w-4xl mx-auto">
          {/* Current Image Display */}
          <motion.div
            key={currentImage.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Before/After Slider */}
            <div
              ref={sliderRef}
              className="relative overflow-hidden rounded-2xl shadow-2xl bg-gray-200 cursor-crosshair"
              style={{ aspectRatio: '16/10' }}
              onMouseMove={handleMouseMove}
              onClick={() => setIsFullscreen(true)}
            >
              {/* Before Image */}
              <div className="absolute inset-0">
                <Image
                  src={currentImage.before}
                  alt={`Before: ${currentImage.titleFi}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  ENNEN
                </div>
              </div>

              {/* After Image */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <Image
                  src={currentImage.after}
                  alt={`After: ${currentImage.titleFi}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  JÄLKEEN
                </div>
              </div>

              {/* Slider Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <Eye className="w-4 h-4 text-gray-600" />
                </div>
              </div>

              {/* Controls Overlay */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsAutoPlaying(!isAutoPlaying);
                  }}
                  className="text-white hover:text-emerald-400 transition-colors"
                >
                  {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    resetSlider();
                  }}
                  className="text-white hover:text-emerald-400 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <span className="text-white text-sm">{Math.round(sliderPosition)}%</span>
              </div>
            </div>

            {/* Image Info */}
            <div className="mt-6 bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {currentImage.titleFi}
                  </h3>
                  <p className="text-gray-600 mb-3">{currentImage.descriptionFi}</p>

                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center space-x-1 text-emerald-600">
                      <Sparkles className="w-4 h-4" />
                      <span className="font-medium">{currentImage.serviceFi}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-blue-600">
                      <Clock className="w-4 h-4" />
                      <span>{currentImage.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-600">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-medium">{currentImage.rating}/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <button
              onClick={prevImage}
              disabled={filteredImages.length <= 1}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>

            <div className="flex items-center space-x-2">
              {filteredImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setSliderPosition(50);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-emerald-600 scale-125'
                      : 'bg-gray-300 hover:bg-emerald-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextImage}
              disabled={filteredImages.length <= 1}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <div className="text-center bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-emerald-600 mb-2">500+</div>
              <div className="text-gray-600">Tyytyväistä Asiakasta</div>
            </div>
            <div className="text-center bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">4.9</div>
              <div className="text-gray-600">Keskimääräinen Arvosana</div>
            </div>
            <div className="text-center bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600">Tyytyväisyystakuu</div>
            </div>
            <div className="text-center bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">24h</div>
              <div className="text-gray-600">Nopea Palvelu</div>
            </div>
          </motion.div>
        </div>

        {/* Fullscreen Modal */}
        <AnimatePresence>
          {isFullscreen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setIsFullscreen(false)}
            >
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              >
                <X className="w-8 h-8" />
              </button>

              <div
                className="relative max-w-5xl w-full h-full max-h-[80vh] overflow-hidden rounded-lg cursor-crosshair"
                onMouseMove={handleMouseMove}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Before Image */}
                <div className="absolute inset-0">
                  <Image
                    src={currentImage.before}
                    alt={`Before: ${currentImage.titleFi}`}
                    fill
                    className="object-contain"
                    sizes="90vw"
                  />
                </div>

                {/* After Image */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <Image
                    src={currentImage.after}
                    alt={`After: ${currentImage.titleFi}`}
                    fill
                    className="object-contain"
                    sizes="90vw"
                  />
                </div>

                {/* Slider Line */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <Eye className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}