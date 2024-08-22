import React, { useState, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { addWidget } from '../data/store';

function AddWidgetModal({ isOpen, setIsOpen, initialCategory }) {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.dashboard.categories);
  const [newWidget, setNewWidget] = useState({ name: '', type: 'text', content: '' });
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const handleAddWidget = () => {
    if (newWidget.name && selectedCategory) {
      dispatch(addWidget({
        categoryId: selectedCategory,
        widget: {
          id: Date.now().toString(),
          ...newWidget
        }
      }));
      setNewWidget({ name: '', type: 'text', content: '' });
      setSelectedCategory('');
      setIsOpen(false);
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                        Add New Widget
                      </Dialog.Title>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Widget Name"
                          className="w-full px-3 py-2 border rounded-md"
                          value={newWidget.name}
                          onChange={(e) => setNewWidget({ ...newWidget, name: e.target.value })}
                        />
                        <select
                          className="w-full px-3 py-2 border rounded-md"
                          value={newWidget.type}
                          onChange={(e) => setNewWidget({ ...newWidget, type: e.target.value })}
                        >
                          <option value="text">Text</option>
                          <option value="pie">Pie Chart</option>
                          <option value="bar">Bar Chart</option>
                        </select>
                        {newWidget.type === 'text' && (
                          <textarea
                            placeholder="Widget Content"
                            className="w-full px-3 py-2 border rounded-md"
                            value={newWidget.content}
                            onChange={(e) => setNewWidget({ ...newWidget, content: e.target.value })}
                          />
                        )}
                        <select
                          className="w-full px-3 py-2 border rounded-md"
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                          <option value="">Select Category</option>
                          {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end px-4 sm:px-6">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={handleAddWidget}
                      >
                        Add Widget
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default AddWidgetModal;