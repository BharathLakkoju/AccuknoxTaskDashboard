import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { PlusIcon, MagnifyingGlassIcon, HomeIcon, ArrowRightIcon, ChevronRightIcon, BellAlertIcon, ChevronDownIcon, ArrowPathIcon, EllipsisHorizontalCircleIcon, EllipsisHorizontalIcon, ClockIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import Widget from './Widget';
import AddWidgetModal from './AddWidgetModal';

function Dashboard() {
  const categories = useSelector(state => state.dashboard.categories);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddWidgetOpen, setIsAddWidgetOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [refresh, setRefresh] = useState(false);

  const filteredCategories = categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }));

  const handleAddWidgetClick = (categoryId = '') => {
    setSelectedCategory(categoryId);
    setIsAddWidgetOpen(true);
  };

  const handleRefresh = () => {
    // Implement your refresh logic here
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-zinc-100">
      <header className='bg-white w-dvw fixed top-0 z-10 py-5 px-10 shadow-md'>
        <div className='flex justify-between items-center w-full'>
          <nav class="flex" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li class="inline-flex items-center">
                <a href="#" class="inline-flex items-center gap-1 text-sm font-medium text-zinc-400 hover:text-blue-500">
                  <HomeIcon className='size-5' />
                  Home
                </a>
              </li>
              <li>
                <div class="flex items-center">
                  <ChevronRightIcon className='size-5' />
                  <a href="#" class="ms-1 text-sm font-medium text-zinc-900 hover:text-blue-600 md:ms-2">DashBoard V2</a>
                </div>
              </li>
            </ol>
          </nav>
          <div className='flex items-center space-x-4'>
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search anything..."
                className="w-64 pl-10 pr-4 py-2 border rounded-lg bg-zinc-200 text-zinc-900 placeholder:text-zinc-900"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-900 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <button className='bg-zinc-100 border rounded-md border-zinc-900 p-2'>
              <BellAlertIcon className="size-5 text-gray-900" />
            </button>
            <button className="bg-zinc-100 border rounded-md border-zinc-900 px-3 py-2 flex items-center space-x-2">
              <span className='font-semibold'>AccountName</span>
              <ChevronDownIcon className="size-5 text-zinc-900 pt-1" />
            </button>
          </div>
        </div>
      </header>
      <header className="bg-zinc-100 w-[100rem] mx-auto mt-20">
        <div className="w-full mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <span className="text-2xl font-semibold text-gray-900">CNAPP Dashboard</span>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleAddWidgetClick()}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2 text-white" />
              Add Widget
            </button>
            <button onClick={handleRefresh} className="bg-zinc-100 text-zinc-900 p-2 rounded-lg flex items-center border border-zinc-900">
              <ArrowPathIcon className="size-5" />
            </button>
            <button className="bg-zinc-100 text-zinc-900 p-2 rounded-lg flex items-center border border-zinc-900">
              <EllipsisVerticalIcon className="size-5" />
            </button>
            <button className="bg-zinc-100 text-zinc-900 p-2 rounded-lg flex items-center border-2 border-blue-900 gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="darkblue" className="size-6">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
              </svg>
              <span className='text-2xl text-blue-900 mt-[-10px]'>|</span>
              <span className='text-sm font-bold text-blue-900 -mt-1'>Last 2 Days</span>
            </button>
          </div>
        </div>
      </header>
      {!refresh && (
        <main className="max-w-[100rem] mx-auto py-6 sm:px-6 lg:px-8">
          {filteredCategories.map(category => (
            <div key={category.id} className="mb-8">
              <span className="text-xl font-semibold text-gray-900 my-4">{category.name}</span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                {category.widgets.map(widget => (
                  <Widget key={widget.id} widget={widget} categoryId={category.id} />
                ))}
                {category.widgets.length < 3 && (
                  <div className='flex justify-center items-center bg-white shadow-lg rounded-md'>
                    <button
                      onClick={() => handleAddWidgetClick(category.id)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center"
                    >
                      <PlusIcon className="h-5 w-5 mr-2" />
                      Add Widget
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </main>
      )}
      {refresh && (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        </div>
      )}
      <AddWidgetModal
        isOpen={isAddWidgetOpen}
        setIsOpen={setIsAddWidgetOpen}
        initialCategory={selectedCategory}
      />
    </div >
  );
}

export default Dashboard;