import React, { useState, useEffect, useMemo, useCallback } from 'react';

const OceanTimeline = () => {
  const [currentDataType, setCurrentDataType] = useState('sst');
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [preloadProgress, setPreloadProgress] = useState(0);
  const [imageCache] = useState(new Map());

  // Memoize frame generation to avoid recalculation
  const sstFrames = useMemo(() => {
    const frames = [];
    const years = ['03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'];
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    
    years.forEach(year => {
      months.forEach(month => {
        const fullYear = 2000 + parseInt(year);
        const filename = `${month}_01_${year}.png`;
        
        frames.push({
          id: `sst-${fullYear}-${month}`,
          date: new Date(fullYear, parseInt(month) - 1, 1),
          year: fullYear,
          month,
          displayName: `${fullYear}-${month}`,
          type: 'sst',
          imagePath: `/assets/sst/images/${filename}`,
          label: `SST ${fullYear}-${month}`,
        });
      });
    });
    
    return frames.sort((a, b) => a.date - b.date);
  }, []);

  const sssFrames = useMemo(() => {
    const frames = [];
    const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    
    years.forEach(year => {
      months.forEach(month => {
        if (year === 2015 && parseInt(month) < 4) return;
        const filename = `${month}_${year}.png`;
        
        frames.push({
          id: `sss-${year}-${month}`,
          date: new Date(year, parseInt(month) - 1, 1),
          year,
          month,
          displayName: `${year}-${month}`,
          type: 'sss',
          imagePath: `/assets/sss/pngs/${filename}`,
          label: `SSS ${year}-${month}`,
        });
      });
    });
    
    return frames.sort((a, b) => a.date - b.date);
  }, []);

  const chlFrames = useMemo(() => {
    const frames = [];
    const years = ['03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'];
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    
    years.forEach(year => {
      months.forEach(month => {
        const fullYear = 2000 + parseInt(year);
        const filename = `${month}_01_${year}.png`;

        frames.push({
          id: `chl-${fullYear}-${month}`,
          date: new Date(fullYear, parseInt(month) - 1, 1),
          year: fullYear,
          month,
          displayName: `${fullYear}-${month}`,
          type: 'chl',
          imagePath: `/assets/chl/${filename}`,
          label: `CHL ${fullYear}-${month}`,
        });
      });
    });
    
    return frames.sort((a, b) => a.date - b.date);
  }, []);

  const frames = useMemo(() => {
    if (currentDataType === 'sst') return sstFrames;
    if (currentDataType === 'sss') return sssFrames;
    if (currentDataType === 'chl') return chlFrames;
    return [];
  }, [currentDataType, sstFrames, sssFrames, chlFrames]);

  // Preload images in batches
  const preloadImages = useCallback(async (framesToPreload) => {
    const batchSize = 5; // Load 5 images at a time
    const totalImages = framesToPreload.length;
    let loadedCount = 0;

    for (let i = 0; i < framesToPreload.length; i += batchSize) {
      const batch = framesToPreload.slice(i, i + batchSize);
      
      await Promise.allSettled(
        batch.map(frame => {
          return new Promise((resolve) => {
            if (imageCache.has(frame.imagePath)) {
              loadedCount++;
              setPreloadProgress(Math.round((loadedCount / totalImages) * 100));
              resolve();
              return;
            }

            const img = new Image();
            img.onload = () => {
              imageCache.set(frame.imagePath, img);
              loadedCount++;
              setPreloadProgress(Math.round((loadedCount / totalImages) * 100));
              resolve();
            };
            img.onerror = () => {
              loadedCount++;
              setPreloadProgress(Math.round((loadedCount / totalImages) * 100));
              resolve();
            };
            img.src = frame.imagePath;
          });
        })
      );
    }
  }, [imageCache]);

  // Preload nearby frames for smooth navigation
  const preloadNearbyFrames = useCallback((currentIndex) => {
    const range = 3; // Preload 3 frames before and after
    const indicesToPreload = [];
    
    for (let i = Math.max(0, currentIndex - range); i <= Math.min(frames.length - 1, currentIndex + range); i++) {
      if (!imageCache.has(frames[i].imagePath)) {
        indicesToPreload.push(frames[i]);
      }
    }
    
    if (indicesToPreload.length > 0) {
      preloadImages(indicesToPreload);
    }
  }, [frames, imageCache, preloadImages]);

  // Initial load
  useEffect(() => {
    setLoading(true);
    setCurrentFrameIndex(0);
    setPreloadProgress(0);
    
    // Preload first 10 frames immediately
    const initialFrames = frames.slice(0, 10);
    preloadImages(initialFrames).then(() => {
      setLoading(false);
      
      // Continue preloading rest in background
      if (frames.length > 10) {
        preloadImages(frames.slice(10));
      }
    });
  }, [currentDataType, frames, preloadImages]);

  // Preload nearby frames when index changes
  useEffect(() => {
    if (!loading) {
      preloadNearbyFrames(currentFrameIndex);
    }
  }, [currentFrameIndex, loading, preloadNearbyFrames]);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || frames.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentFrameIndex(prev => (prev + 1) % frames.length);
    }, 800); // Slightly faster playback
    
    return () => clearInterval(interval);
  }, [isPlaying, frames.length]);

  const currentFrame = frames[currentFrameIndex];

  const handleFrameClick = useCallback((index) => {
    setCurrentFrameIndex(index);
    setIsPlaying(false);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading ocean data...</p>
          {preloadProgress > 0 && (
            <div className="w-64">
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gray-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${preloadProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">{preloadProgress}% loaded</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 p-4">
      <div className="h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Ocean Data Timeline</h1>
              <p className="text-gray-600 mt-1">Temporal analysis of sea surface parameters</p>
            </div>
            
            {/* Data Type Selector */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setCurrentDataType('sst')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  currentDataType === 'sst'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Temperature
              </button>
              <button
                onClick={() => setCurrentDataType('sss')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  currentDataType === 'sss'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Salinity
              </button>
              <button
                onClick={() => setCurrentDataType('chl')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  currentDataType === 'chl'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Sea Color
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full">
          
          {/* Image and Info Section */}
          <div className="flex-1 flex">
            
            {/* Image Display */}
            <div className="flex-1 p-6 flex items-center justify-center bg-gray-50">
              {currentFrame && (
                <div className="relative max-w-full max-h-full">
                  {imageLoading && !imageCache.has(currentFrame.imagePath) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded">
                      <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                    </div>
                  )}
                  <img
                    src={currentFrame.imagePath}
                    alt={currentFrame.label}
                    className={`max-w-full max-h-full object-contain rounded shadow-sm transition-opacity duration-200 ${
                      imageLoading && !imageCache.has(currentFrame.imagePath) ? 'opacity-0' : 'opacity-100'
                    }`}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    onLoadStart={() => !imageCache.has(currentFrame.imagePath) && setImageLoading(true)}
                    loading="eager"
                  />
                </div>
              )}
            </div>

            {/* Info Panel */}
            <div className="w-80 bg-white border-l border-gray-200 p-6">
              {currentFrame && (
                <div className="space-y-6">
                  
                  {/* Current Frame Info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                      {currentDataType === 'sst' ? 'Sea Surface Temperature' : 
                       currentDataType === 'sss' ? 'Sea Surface Salinity' : 'Chlorophyll-a'}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {new Date(currentFrame.year, parseInt(currentFrame.month) - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </div>
                    <div className="text-sm text-gray-600">
                      Frame {currentFrameIndex + 1} of {frames.length}
                    </div>
                  </div>

                  {/* Frame Selector */}
                  <div className="space-y-3">
                    <div className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                      Jump to Frame
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        min="1"
                        max={frames.length}
                        value={currentFrameIndex + 1}
                        onChange={(e) => {
                          const frameNum = parseInt(e.target.value);
                          if (frameNum >= 1 && frameNum <= frames.length) {
                            setCurrentFrameIndex(frameNum - 1);
                            setIsPlaying(false);
                          }
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="Frame #"
                      />
                      <select
                        value={currentFrameIndex}
                        onChange={(e) => {
                          setCurrentFrameIndex(parseInt(e.target.value));
                          setIsPlaying(false);
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      >
                        {frames.map((frame, index) => (
                          <option key={frame.id} value={index}>
                            {frame.displayName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Enhanced Controls */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setCurrentFrameIndex(Math.max(0, currentFrameIndex - 1))}
                        disabled={currentFrameIndex === 0}
                        className="flex items-center justify-center px-3 py-2.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous
                      </button>
                      
                      <button
                        onClick={() => setCurrentFrameIndex(Math.min(frames.length - 1, currentFrameIndex + 1))}
                        disabled={currentFrameIndex === frames.length - 1}
                        className="flex items-center justify-center px-3 py-2.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        Next
                        <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                    
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-full flex items-center justify-center px-4 py-3 bg-gray-900 hover:bg-gray-800 active:bg-gray-700 text-white rounded-md text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                    >
                      {isPlaying ? (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                          </svg>
                          Pause Timeline
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                          Play Timeline
                        </>
                      )}
                    </button>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gray-900 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${((currentFrameIndex + 1) / frames.length) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{frames[0]?.displayName}</span>
                        <span>{frames[frames.length - 1]?.displayName}</span>
                      </div>
                    </div>
                  </div>

                  {/* SSS Gradient Scale */}
                  {currentDataType === 'sss' && (
                    <div className="space-y-3">
                      <div className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                        Salinity Scale
                      </div>
                      <div className="space-y-2">
                        <div className="h-6 bg-gradient-to-r from-blue-900 via-blue-500 via-cyan-400 via-green-400 to-red-500 rounded"></div>
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Low</span>
                          <span>High</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Cache Status */}
                  <div className="text-xs text-gray-500">
                    {imageCache.size} images cached
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Timeline Bar */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex gap-1 overflow-x-auto pb-2">
              {frames.map((frame, index) => (
                <button
                  key={frame.id}
                  onClick={() => handleFrameClick(index)}
                  className={`flex-shrink-0 px-3 py-2 text-xs font-medium rounded transition-all duration-200 hover:bg-gray-100 ${
                    index === currentFrameIndex
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-50 text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {frame.displayName}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OceanTimeline;