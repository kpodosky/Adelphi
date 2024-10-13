import React, { useState, useEffect } from 'react';
import { ChevronDown, Flag, Pause, Edit, Download, Lock } from 'lucide-react';

const services = [
  "Ielts academic", "ielts general", "UKVI ielts general", "UKVI ielts academic",
  "Ielts life skill", "Toefl", "Gmat", "Gre", "SELT", "PTE core", "PTE", "GED",
  "LSAT", "PLAB1", "PLAB 2", "WES", "AIMS", "Sevis fee", "Visa fees usA",
  "Visa Fee Canada", "tuition fees payments", "Celpip", "Duolingo",
  "Sat with essay", "Act with essay", "SAT", "Act", "borrow laptop or tests",
  "oet", "Kte", "Australian skill immigration assesment test", "Lsac", "Mcat",
  "Pelmo", "Nclex", "Rex-Pn", "Ecctis", "Naric e-valution", "Spantran evaluation",
  "E-migris", "Finland schools applictaion"
];

const ServiceItem = ({ service, onDragStart }) => (
  <div
    draggable
    onDragStart={(e) => onDragStart(e, service)}
    className="bg-white p-2 mb-2 rounded shadow cursor-move"
  >
    {service}
  </div>
);

const ProgressBar = ({ progress }) => (
  <div className="w-[30%] bg-gray-200 rounded-full h-2.5">
    <div
      className={`h-2.5 rounded-full ${
        progress < 100 ? 'bg-gray-500' : 'bg-green-500'
      }`}
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

const Dropdown = ({ isComplete }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          Options
          <ChevronDown className="ml-2 h-5 w-5" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
              <Flag className="mr-3 h-5 w-5" /> Flag
            </button>
            <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
              <Pause className="mr-3 h-5 w-5" /> Stop
            </button>
            <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
              <Edit className="mr-3 h-5 w-5" /> Edit details
            </button>
            {isComplete && (
              <>
                <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                  <Download className="mr-3 h-5 w-5" /> Download information
                </button>
                <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                  <Lock className="mr-3 h-5 w-5" /> Check password
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [availableServices, setAvailableServices] = useState(services);
  const [selectedServices, setSelectedServices] = useState([]);
  const [progresses, setProgresses] = useState({});
  const [showPrompt, setShowPrompt] = useState(false);
  const [showPricePrompt, setShowPricePrompt] = useState(false);

  useEffect(() => {
    const timers = {};
    selectedServices.forEach((service) => {
      if (!(service in progresses)) {
        timers[service] = setInterval(() => {
          setProgresses((prev) => {
            const newProgress = (prev[service] || 0) + 10;
            if (newProgress >= 100) {
              clearInterval(timers[service]);
            }
            return { ...prev, [service]: Math.min(newProgress, 100) };
          });
        }, 1000);
      }
    });
    return () => {
      Object.values(timers).forEach(clearInterval);
    };
  }, [selectedServices, progresses]);

  const onDragStart = (e, service) => {
    e.dataTransfer.setData('text/plain', service);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, targetList) => {
    e.preventDefault();
    const service = e.dataTransfer.getData('text');
    
    if (targetList === 'selected' && !selectedServices.includes(service)) {
      setAvailableServices(availableServices.filter(s => s !== service));
      setSelectedServices([...selectedServices, service]);
      setShowPrompt(true);
    } else if (targetList === 'available' && !availableServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
      setAvailableServices([...availableServices, service]);
    }
  };

  const handlePromptSubmit = () => {
    setShowPrompt(false);
    setShowPricePrompt(true);
  };

  const handlePricePromptSubmit = () => {
    setShowPricePrompt(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Service Selection App</h1>
      <div className="flex">
        <div 
          className="w-1/2 bg-gray-100 p-4 rounded mr-4 min-h-[300px]"
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, 'available')}
        >
          <h2 className="text-xl font-semibold mb-2">Available Services</h2>
          {availableServices.map((service) => (
            <ServiceItem key={service} service={service} onDragStart={onDragStart} />
          ))}
        </div>
        <div 
          className="w-1/2 bg-gray-100 p-4 rounded min-h-[300px]"
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, 'selected')}
        >
          <h2 className="text-xl font-semibold mb-2">Drop the service below to start payments:</h2>
          {selectedServices.map((service) => (
            <div key={service} className="mb-4 flex items-center">
              <ServiceItem service={service} onDragStart={onDragStart} />
              <div className="ml-2 flex items-center">
                <ProgressBar progress={progresses[service] || 0} />
                <Dropdown isComplete={progresses[service] === 100} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {showPrompt && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Visa Details</h3>
            <input type="text" placeholder="Country" className="border p-2 mb-2 w-full" />
            <input type="text" placeholder="Visa Type" className="border p-2 mb-2 w-full" />
            <button onClick={handlePromptSubmit} className="bg-blue-500 text-white p-2 rounded">Submit</button>
          </div>
        </div>
      )}
      {showPricePrompt && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Service Prices</h3>
            {selectedServices.map((service, index) => (
              <p key={index}>{service}: $XX.XX</p>
            ))}
            <button onClick={handlePricePromptSubmit} className="bg-blue-500 text-white p-2 rounded mt-4">Process Payment</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
