// Full updated App code implementing right-side tile (Transcript) toggling the Summary panel on the left

import React, { useState } from 'react';
import {
  Search, Home, FileText, Users, CheckSquare, UserCircle,
  HelpCircle, ChevronLeft, ChevronRight, ChevronDown, CalendarDays,
  ArrowRight, Edit3, Maximize2, Minimize2, ChevronsLeft, ChevronsRight, GripVertical, Menu
} from 'lucide-react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { mockData } from './mockdata'; // Ensure this file exists and is correctly formatted

const navItems = [
  { icon: <Search size={20} />, label: 'Search' },
  { icon: <Home size={20} />, label: 'Home' },
  { icon: <FileText size={20} />, label: 'Meetings notes', active: true },
  { icon: <Users size={20} />, label: 'Clients' },
  { icon: <CheckSquare size={20} />, label: 'Tasks' },
];
const userSpace = { icon: <UserCircle size={20} />, label: "Rohit's Space" };
const helpItem = { icon: <HelpCircle size={20} />, label: 'Need help?' };

const NavItem = ({ icon, label, active, href = "#" }) => (
  <a
    href={href}
    className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-150 ${
      active ? 'bg-blue-100 dark:bg-slate-700 text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-600 dark:text-gray-300'
    }`}
  >
    {icon}
    {label && <span>{label}</span>}
  </a>
);

const Sidebar = ({ isCollapsed, setIsCollapsed }) => (
  <div
    className={`bg-gray-50 dark:bg-slate-800 h-screen flex flex-col  transition-all duration-300 ${
      isCollapsed ? 'w-20 items-center' : 'w-64'
    } flex-shrink-0`}
  >
    <div className="p-4 flex items-center justify-center relative h-[57px]">
      {!isCollapsed && <h1 className="text-2xl font-bold text-gray-800 dark:text-white">SATURN</h1>}
    </div>
    <div className="relative border-b border-gray-300 dark:border-slate-600 mb-2">
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 p-1 shadow-md hover:bg-gray-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <ChevronsRight size={16} className="text-gray-600 dark:text-gray-300" />
        ) : (
          <ChevronsLeft size={16} className="text-gray-600 dark:text-gray-300" />
        )}
      </button>
    </div>
    <nav className="flex-grow space-y-2 p-4">
      {navItems.map((item) => (
        <NavItem key={item.label} icon={item.icon} label={isCollapsed ? '' : item.label} active={item.active} />
      ))}
    </nav>
    <div className="mt-auto space-y-2 p-4 border-t border-gray-200 dark:border-slate-700">
      <NavItem icon={userSpace.icon} label={isCollapsed ? '' : userSpace.label} />
      <NavItem icon={helpItem.icon} label={isCollapsed ? '' : helpItem.label} />
    </div>
  </div>
);

const MainHeader = () => (
  <div className="flex items-center justify-between p-4 h-[57px] flex-shrink-0">
    <button className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
      <ChevronLeft size={18} />
      <span>Back to home</span>
    </button>
  </div>
);

const MeetingDetailsHeader = () => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-6 border-b border-gray-200 dark:border-slate-700 flex-shrink-0">
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

const CollapsibleSection = ({ title, sections, onSelectContent, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="py-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 py-1.5"
      >
        <span className="font-medium text-sm">{title}</span>
        <ChevronDown
          size={18}
          className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="mt-2 pl-3 border-l-2 border-gray-200 dark:border-slate-600">
          {sections.map(section => (
            <p
              key={section.id}
              className="text-xs text-gray-600 dark:text-gray-400 py-1.5 px-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => onSelectContent(section.unstructured_facts || [], section.name)}
            >
              {section.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

const SummaryPanel = ({ onSelectContent, isCollapsed }) => (
  <div
    className={`transition-all duration-300 border-r border-gray-200 dark:border-slate-700 overflow-y-auto bg-gray-50 dark:bg-slate-800 thin-scrollbar ${
      isCollapsed ? 'w-14 flex items-center justify-center' : 'w-80 p-4'
    }`}
  >
    {isCollapsed ? (
      <Menu size={20} className="text-gray-500 dark:text-gray-400" />
    ) : (
      <>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 px-1">Meeting summary</h3>
        <div className="space-y-1">
          {mockData.sections.map((item, index) => (
            <CollapsibleSection
              key={index}
              title={item.header}
              sections={item.sections}
              onSelectContent={onSelectContent}
              defaultOpen={true}
            />
          ))}
        </div>
      </>
    )}
  </div>
);


const SortableFact = ({ fact, id }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
    ref={setNodeRef}
    style={style}
    className="flex items-start p-3 bg-white shadow-sm mb-3 rounded-lg  hover:bg-[rgb(222,222,222)] hover:border-l hover:border-gray-300"
  >
    <span
      ref={setActivatorNodeRef}
      {...attributes}
      {...listeners}
      className="mr-3 cursor-grab text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 mt-0.5 p-1"
      title="Drag to reorder"
    >
      <GripVertical size={18} />
    </span>
    <div className="flex-grow">
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed border-l border-black pl-2">
        {fact.content}
      </p>
    </div>
  </div>
  
  );
};

const MeetingContent = ({ selectedData, onSort }) => {
  const { title, facts } = selectedData || { title: "Meeting Summary", facts: [] };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id && over?.id && active.id !== over.id) {
      const oldIndex = facts.findIndex(f => f.id === active.id);
      const newIndex = facts.findIndex(f => f.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        onSort(arrayMove(facts, oldIndex, newIndex));
      }
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="p-6 h-full overflow-y-auto bg-gray-50 dark:bg-slate-900 thin-scrollbar" >
        <div className="flex items-center justify-between mb-2 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Edit3 size={14} className="mr-1.5" />
            <span>Curated by CoPlanner at 12:32 PM : 28 Dec 2024</span>
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">{title}</h2>
        {facts && facts.length > 0 ? (
          <SortableContext items={facts.map(f => f.id)} strategy={verticalListSortingStrategy}>
            {facts.map((fact) => (
              <SortableFact key={fact.id} id={fact.id} fact={fact} />
            ))}
          </SortableContext>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <FileText size={48} className="text-gray-400 dark:text-gray-500 mb-4" />
            <p className="italic text-gray-500 dark:text-gray-400">Select a section from the summary panel to see details.</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Or, content for this section will appear here.</p>
          </div>
        )}
      </div>
    </DndContext>
  );
};

const TranscriptPanel = ({ onToggleSummary, isSummaryCollapsed }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleBoth = () => {
    setIsCollapsed(!isCollapsed);
    onToggleSummary(); // This will trigger collapsing or expanding the sidebar on the parent
  };

  return (
    <div
      className={`relative bg-gray-50 dark:bg-slate-800 transition-all duration-300 ${
        isCollapsed ? 'w-12' : 'w-80' // Sidebar collapses to a small tile when collapsed
      } border-l border-gray-200 dark:border-slate-700 flex flex-col flex-shrink-0`}
    >
      {/* Toggle Button */}
      {/* <button
        onClick={toggleBoth}
        className="absolute -left-3 top-1/2 transform -translate-y-1/2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-full p-1 shadow-md z-20 hover:bg-gray-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={isCollapsed ? 'Expand transcript panel' : 'Collapse transcript panel'}
      >
        {isCollapsed ? (
          <ChevronsLeft size={16} className="text-gray-600 dark:text-gray-300" />
        ) : (
          <ChevronsRight size={16} className="text-gray-600 dark:text-gray-300" />
        )}
      </button> */}

      {/* When Expanded: Full Transcript */}
      {/* {!isCollapsed && ( */}
        <>
        <div className="p-4 flex items-center justify-start border-b border-gray-200 dark:border-slate-700 h-[57px]">
        <span className="font-semibold text-gray-800 dark:text-white text-md">Meeting Transcript</span>
        <button className="pl-4"> {/* Add padding-left here */}
          <ChevronsLeft size={16} className="text-gray-600 dark:text-gray-300" />
        </button>
      </div>
          <div className="p-4 overflow-y-auto flex-grow">
            <p className="text-sm text-gray-700 dark:text-gray-300">Transcript content will appear here...</p>
          </div>
        </>
      {/* )} */}

      {/* When Collapsed: Small Tile */}
      {/* {isCollapsed && (
        <div className="flex-grow flex items-center justify-center pt-10">
          <div className="flex flex-col items-center text-gray-500 dark:text-gray-400 space-y-1">
            <FileText size={20} />
            <div className="w-4 h-0.5 bg-gray-400 rounded-sm" />
            <div className="w-3 h-0.5 bg-gray-400 rounded-sm" />
            <div className="w-2 h-0.5 bg-gray-400 rounded-sm" />
          </div>
        </div>
      )} */}
    </div>
  );
};



const MainContent = ({ selectedData, onSelectContent, onSort, isSummaryCollapsed, setIsSummaryCollapsed }) => (
  <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 overflow-hidden border-[rgb(200,200,200)] border-l border-t rounded-tl-[15px] mt-6">
    <MainHeader />
    <MeetingDetailsHeader />
    <div className="flex-1 flex flex-row overflow-hidden">
      <SummaryPanel onSelectContent={onSelectContent} isCollapsed={isSummaryCollapsed} />
      <div className="flex-1 min-w-0 flex flex-col bg-gray-50 dark:bg-slate-900">
        <MeetingContent selectedData={selectedData} onSort={onSort} />
      </div>
      <TranscriptPanel isSummaryCollapsed={isSummaryCollapsed} onToggleSummary={() => setIsSummaryCollapsed(prev => !prev)} />
    </div>
  </div>
);

export default function App() {
  const [selectedData, setSelectedData] = useState(() => {
    const firstSectionGroup = mockData.sections[0];
    const firstSubSection = firstSectionGroup?.sections[0];
    return {
      title: firstSubSection?.name ?? 'Meeting Summary',
      facts: firstSubSection?.unstructured_facts ?? []
    };
  });
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
  const [isSummaryCollapsed, setIsSummaryCollapsed] = useState(false);

  return (
    <div className="flex h-screen font-sans text-gray-900 dark:text-gray-100">
      <Sidebar isCollapsed={isLeftSidebarCollapsed} setIsCollapsed={setIsLeftSidebarCollapsed} />

      <MainContent 
        selectedData={selectedData}
        onSelectContent={(facts, title) => setSelectedData({ title, facts })}
        onSort={(newFacts) => setSelectedData(prev => ({ ...prev, facts: newFacts }))}
        isSummaryCollapsed={isSummaryCollapsed}
        setIsSummaryCollapsed={setIsSummaryCollapsed}
      />
    </div>
  );
}
