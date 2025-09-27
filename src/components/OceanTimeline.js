import React, { useState, useEffect } from 'react';

const OceanTimeline = () => {
  const [currentDataType, setCurrentDataType] = useState('sst'); // 'sst' for temperature, 'sss' for salinity
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [frames, setFrames] = useState([]);
  const [loading, setLoading] = useState(true);

  // Generate timeline frames from actual PNG files (Sea Surface Temperature)
  const generateSSTFrames = () => {
    const sstFrames = [];
    
    // Based on your actual SST image naming pattern: MM_DD_YY.png
    // Sample years from 2003-2025, monthly data
    const years = ['03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'];
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    
    years.forEach(year => {
      months.forEach(month => {
        const fullYear = 2000 + parseInt(year);
        const day = '01'; // Using 1st day of each month
        const filename = `${month}_${day}_${year}.png`;
        
        sstFrames.push({
          id: `sst-${fullYear}-${month}`,
          date: new Date(fullYear, parseInt(month) - 1, 1),
          year: fullYear,
          month,
          displayName: `${fullYear}-${month}`,
          type: 'sst',
          filename: filename,
          imagePath: `/assets/sst/images/${filename}`,
          //description: `Sea Surface Temperature - ${new Date(fullYear, parseInt(month) - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
        });
      });
    });
    
    // Sort by date
    return sstFrames.sort((a, b) => a.date - b.date);
  };

  // Generate timeline frames from SSS PNG files (Sea Surface Salinity)
  const generateSSSFrames = () => {
    const sssFrames = [];
    
    // Based on your actual SSS PNG image naming pattern: MM_YYYY.png
    // Years from 2015-2023, monthly data (some months start from April 2015)
    const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    
    years.forEach(year => {
      months.forEach(month => {
        // Skip months that don't exist (e.g., Jan-Mar 2015)
        if (year === 2015 && parseInt(month) < 4) return;
        if (year === 2016 && parseInt(month) < 1) return;
        
        const filename = `${month}_${year}.png`;
        
        sssFrames.push({
          id: `sss-${year}-${month}`,
          date: new Date(year, parseInt(month) - 1, 1),
          year,
          month,
          displayName: `${year}-${month}`,
          type: 'sss',
          filename: filename,
          imagePath: `/assets/sss/pngs/${filename}`,
          label: `SSS ${year}-${month}`,
          description: `Sea Surface Salinity - ${new Date(year, parseInt(month) - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
        });
      });
    });
    
    // Sort by date
    return sssFrames.sort((a, b) => a.date - b.date);
  };

  // Load frames based on current data type
  useEffect(() => {
    setLoading(true);
    let newFrames = [];
    
    if (currentDataType === 'sst') {
      newFrames = generateSSTFrames();
    } else {
      newFrames = generateSSSFrames();
    }
    
    setFrames(newFrames);
    setCurrentFrameIndex(0);
    setLoading(false);
  }, [currentDataType]);

  // Auto-play functionality with smoother transitions
  useEffect(() => {
    if (!isPlaying || frames.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentFrameIndex(prev => (prev + 1) % frames.length);
    }, 1000); // Change frame every 1 second for smoother viewing
    
    return () => clearInterval(interval);
  }, [isPlaying, frames.length]);

  const currentFrame = frames[currentFrameIndex];

  const handleFrameClick = (index) => {
    setCurrentFrameIndex(index);
    setIsPlaying(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Ocean Data Timeline Visualizer</h3>
        <p className="text-gray-600 mb-6">
          Explore temporal changes in sea surface temperature and salinity
        </p>
        
        {/* Data Type Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-200 rounded-lg p-1">
            <button
              onClick={() => setCurrentDataType('sst')}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                currentDataType === 'sst'
                  ? 'bg-red-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              🌡️ Sea Surface Temperature
            </button>
            <button
              onClick={() => setCurrentDataType('sss')}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                currentDataType === 'sss'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              🧂 Sea Surface Salinity
            </button>
          </div>
        </div>
      </div>

      {/* Main Display Area */}
      <div className="mb-8">
        {currentFrame && (
          <div className="text-center">
            <div className="bg-gray-100 rounded-2xl p-8 mb-4">
              {currentDataType === 'sst' ? (
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{currentFrame.label}</h4>
                  <p className="text-gray-600 mb-4">{currentFrame.description}</p>
                  
                  {/* SST Image Display with smooth transitions */}
                  <div className="mb-4 relative">
                    <div className="overflow-hidden rounded-lg shadow-lg mx-auto" style={{ maxHeight: '400px' }}>
                      <img
                        src={currentFrame.imagePath}
                        alt={currentFrame.label}
                        className="max-w-full h-auto mx-auto transition-opacity duration-500 ease-in-out"
                        style={{ maxHeight: '400px' }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentNode.nextSibling.style.display = 'block';
                        }}
                        onLoad={(e) => {
                          e.target.parentNode.nextSibling.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="bg-gray-200 p-8 rounded-lg" style={{ display: 'none' }}>
                      <p className="text-gray-500">Image not available: {currentFrame.filename}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-6xl mb-4">🧂</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{currentFrame.label}</h4>
                  <p className="text-gray-600 mb-4">{currentFrame.description}</p>
                  
                  {/* SSS Image Display with smooth transitions */}
                  <div className="mb-4 relative">
                    <div className="overflow-hidden rounded-lg shadow-lg mx-auto" style={{ maxHeight: '400px' }}>
                      <img
                        src={currentFrame.imagePath}
                        alt={currentFrame.label}
                        className="max-w-full h-auto mx-auto transition-opacity duration-500 ease-in-out"
                        style={{ maxHeight: '400px' }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentNode.nextSibling.style.display = 'block';
                        }}
                        onLoad={(e) => {
                          e.target.parentNode.nextSibling.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="bg-gray-200 p-8 rounded-lg" style={{ display: 'none' }}>
                      <p className="text-gray-500">Image not available: {currentFrame.filename}</p>
                    </div>
                  </div>
                  
                  {/* SSS Gradient Scale */}
                  <div className="mb-4 mx-auto" style={{ maxWidth: '600px' }}>
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h5 className="text-sm font-semibold text-gray-700 mb-2 text-center">Salinity Scale</h5>
                      <div className="relative">
                        <img
                          src="/assets/sss/pngs/sss_gradient.png"
                          alt="Salinity Gradient"
                          className="w-full h-8 rounded transition-all duration-300"
                        />
                        <div className="flex justify-between mt-2 text-xs text-gray-600">
                          <span className="font-medium">⬅ Low Salinity</span>
                          <span className="font-medium">High Salinity ➡</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Timeline Info */}
            <div className="bg-blue-50 p-4 rounded-lg transition-all duration-300">
              <div className="text-lg font-bold text-blue-800">
                {currentFrame.year} - {new Date(currentFrame.year, parseInt(currentFrame.month) - 1).toLocaleDateString('en-US', { month: 'long' })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Timeline Controls */}
      <div className="mb-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={() => setCurrentFrameIndex(Math.max(0, currentFrameIndex - 1))}
            disabled={currentFrameIndex === 0}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded-lg"
          >
            ⏮️ Previous
          </button>
          
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
          >
            {isPlaying ? '⏸️ Pause' : '▶️ Play'}
          </button>
          
          <button
            onClick={() => setCurrentFrameIndex(Math.min(frames.length - 1, currentFrameIndex + 1))}
            disabled={currentFrameIndex === frames.length - 1}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded-lg"
          >
            Next ⏭️
          </button>
        </div>
      </div>

      {/* Timeline Bar */}
      <div className="bg-gray-100 rounded-lg p-4">
        <div className="text-sm font-medium text-gray-700 mb-2">Timeline:</div>
        <div className="flex gap-1 overflow-x-auto pb-2">
          {frames.map((frame, index) => (
            <button
              key={frame.id}
              onClick={() => handleFrameClick(index)}
              className={`flex-shrink-0 px-2 py-1 text-xs rounded transition-all duration-300 transform hover:scale-105 ${
                index === currentFrameIndex
                  ? currentDataType === 'sst'
                    ? 'bg-red-500 text-white shadow-lg scale-110'
                    : 'bg-blue-500 text-white shadow-lg scale-110'
                  : 'bg-white hover:bg-gray-200 text-gray-600 hover:shadow-md'
              }`}
              title={frame.description}
            >
              {frame.displayName}
            </button>
          ))}
        </div>
        
        {/* Timeline Progress Bar with smoother transitions */}
        <div className="mt-3">
          <div className="bg-gray-300 rounded-full h-2 overflow-hidden">
            <div
              className={`h-2 rounded-full transition-all duration-700 ease-out ${
                currentDataType === 'sst' ? 'bg-red-500' : 'bg-blue-500'
              }`}
              style={{ width: `${((currentFrameIndex + 1) / frames.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h5 className="font-semibold text-gray-800 mb-2">Data Information:</h5>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• <strong>SST (Temperature):</strong> PNG images from processed satellite data</li>
          <li>• <strong>SSS (Salinity):</strong> PNG images with salinity gradient scale</li>
          <li>• <strong>Timeline:</strong> Shows year and month for current selection</li>
        </ul>
      </div>
    </div>
  );
};

export default OceanTimeline;