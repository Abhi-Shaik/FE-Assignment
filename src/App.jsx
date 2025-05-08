import React, { useState } from 'react';
import {
  Search, Home, FileText, Users, CheckSquare,
  UserCircle, HelpCircle, ChevronLeft, ChevronRight,
  ChevronDown, CalendarDays, ArrowRight, Edit3,
  Maximize2, Minimize2
} from 'lucide-react';

// Mock data
const navItems = [
  { icon: <Search size={20} />, label: 'Search' },
  { icon: <Home size={20} />, label: 'Home' },
  { icon: <FileText size={20} />, label: 'Meetings notes', active: true },
  { icon: <Users size={20} />, label: 'Clients' },
  { icon: <CheckSquare size={20} />, label: 'Tasks' },
];

const userSpace = { icon: <UserCircle size={20} />, label: "Rohit's Space" };
const helpItem = { icon: <HelpCircle size={20} />, label: 'Need help?' };

const meetingSummaryItems = Array(4).fill({
  title: 'Financial planning',
  sections: ['Goals', 'Risk Tolerance'],
  content: "Explored various investment options and the importance of a diversified portfolio tailored to the client's risk tolerance and financial goals."
});

const NavItem = ({ icon, label, active, href = "#" }) => (
  <a
    href={href}
    className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-150 ${
      active ? 'bg-blue-100 dark:bg-slate-700 text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-600 dark:text-gray-300'
    }`}
  >
    {icon}
    <span>{label}</span>
  </a>
);

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`bg-gray-50 dark:bg-slate-800 h-screen flex flex-col p-4 border-r dark:border-slate-700 transition-all duration-300 ${isCollapsed ? 'w-20 items-center' : 'w-64'}`}>
      <div className={`flex items-center mb-8 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        {!isCollapsed && <h1 className="text-2xl font-bold text-gray-800 dark:text-white">SATURN</h1>}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-slate-700">
          {isCollapsed ? <Maximize2 size={20} className="text-gray-600 dark:text-gray-300" /> : <Minimize2 size={20} className="text-gray-600 dark:text-gray-300" />}
        </button>
      </div>
      <nav className="flex-grow space-y-2">
        {navItems.map((item) => (
          <NavItem key={item.label} icon={item.icon} label={isCollapsed ? '' : item.label} active={item.active} />
        ))}
      </nav>
      <div className="mt-auto space-y-2">
        <NavItem icon={userSpace.icon} label={isCollapsed ? '' : userSpace.label} />
        <NavItem icon={helpItem.icon} label={isCollapsed ? '' : helpItem.label} />
      </div>
    </div>
  );
};

const MainHeader = () => (
  <div className="flex items-center justify-between p-4 border-b dark:border-slate-700">
    <button className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
      <ChevronLeft size={18} />
      <span>Back to home</span>
    </button>
    <div className="flex items-center space-x-4"></div>
  </div>
);

const MeetingDetailsHeader = () => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-6 border-b dark:border-slate-700">
    <div className="flex flex-col sm:flex-row sm:items-center mb-3 sm:mb-0">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2 sm:mb-0 sm:mr-6">Onboarding Call with Smith & Marek</h2>
      <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-1 bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded-md">
          <CalendarDays size={16} />
          <span>Today</span>
        </div>
        <div className="flex items-center space-x-1 bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded-md">
          <Users size={16} />
          <span>Alex + 2 others</span>
        </div>
        <button className="flex items-center space-x-1 bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded-md hover:bg-gray-200 dark:hover:bg-slate-600">
          <span>Onboarding</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-150 w-full sm:w-auto mt-4 sm:mt-0">
      <span>Save document</span>
      <ArrowRight size={16} />
    </button>
  </div>
);

const CollapsibleSection = ({ title, sections, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="py-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
      >
        <span className="font-medium">{title}</span>
        <ChevronDown size={20} className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="mt-2 pl-4 border-l-2 border-blue-500 dark:border-blue-400">
          {sections.map(section => (
            <p key={section} className="text-sm text-gray-600 dark:text-gray-400 py-1">{section}</p>
          ))}
        </div>
      )}
    </div>
  );
};

const SummaryPanel = () => (
  <div className="w-full lg:w-1/3 xl:w-1/4 p-6 border-r dark:border-slate-700 overflow-y-auto">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Meeting summary</h3>
    <div className="space-y-1">
      {meetingSummaryItems.map((item, index) => (
        <CollapsibleSection 
          key={index} 
          title={item.title} 
          sections={item.sections} 
          defaultOpen={index === 0 || index === 2} 
        />
      ))}
    </div>
  </div>
);

const MeetingContent = () => (
  <div className="flex-grow p-6 overflow-y-auto">
    <div className="flex items-center justify-between mb-1">
      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
        <Edit3 size={14} className="mr-1.5" />
        <span>Curated by CoPlanner at 12:32 PM : 28 Dec 2024</span>
      </div>
    </div>
    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Meeting Summary</h2>
    <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
      {meetingSummaryItems.slice(0, 3).map((item, index) => (
        <div key={index} className="pb-4">
          <p className="mb-2">{item.content}</p>
        </div>
      ))}
      <p>Explored various investment options and the importance of a diversified portfolio tailored to the client's risk tolerance and financial goals.</p>
    </div>
  </div>
);

const TranscriptPanel = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className={`transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-full lg:w-1/4 xl:w-1/5'} border-l dark:border-slate-700 flex flex-col`}>
      <div className="p-4 flex items-center justify-between border-b dark:border-slate-700">
        {!isCollapsed && <span className="font-medium text-gray-700 dark:text-gray-200">Meeting transcript</span>}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-slate-700">
          {isCollapsed ? <ChevronLeft size={20} className="text-gray-600 dark:text-gray-300" /> : <ChevronRight size={20} className="text-gray-600 dark:text-gray-300" />}
        </button>
      </div>
      {!isCollapsed && (
        <div className="p-6 overflow-y-auto flex-grow">
          <p className="text-sm text-gray-500 dark:text-gray-400">Transcript content will appear here...</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">This panel can be used to display the full meeting transcript, speaker diarization, etc.</p>
        </div>
      )}
    </div>
  );
};

const MainContent = () => (
  <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 overflow-hidden">
    <MainHeader />
    <MeetingDetailsHeader />
    <div className="flex-1 flex overflow-hidden">
      <SummaryPanel />
      <MeetingContent />
      <TranscriptPanel />
    </div>
  </div>
);

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  return (
    <div className={`flex h-screen font-sans`}>
      <Sidebar />
      <MainContent />
      
    </div>
  );
}