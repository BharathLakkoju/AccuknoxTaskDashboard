import React from 'react';
import { useDispatch } from 'react-redux';
import { removeWidget } from '../data/store';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { XMarkIcon } from '@heroicons/react/24/outline';

function Widget({ widget, categoryId }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeWidget({ categoryId, widgetId: widget.id }));
  };

  const getSum = (data) => {
    return data.reduce((acc, curr) => acc + curr.value, 0);
  };

  const renderWidget = () => {
    switch (widget.type) {
      case 'pie':
        return (
          <div className='flex items-center justify-center min-w-[500px] gap-10'>
            <PieChart width={200} height={200}>
              <Pie
                data={widget.data}
                cx={100}
                cy={100}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {widget.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div>
              <div className="flex flex-col items-center absolute left-[7.5rem] top-[8.5rem]">
                <span className="text-xl font-semibold">{getSum(widget.data)}</span>
                <span className="text-sm font-semibold">Total</span>
              </div>
            </div>
            <div>
              {widget.data.map((entry, index) => (
                <div key={`label-${index}`} className="flex items-center">
                  <div
                    className="w-4 h-4 mr-2"
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-gray-600">{entry.name}</span>
                  <span className="text-gray-600">({entry.value})</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'bar':
        return (
          <div className='flex items-center justify-center min-w-[500px]'>
            <BarChart width={400} height={200} data={widget.data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value">
                {widget.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} className='hover:bg-transparent' />
                ))}
              </Bar>
            </BarChart>
          </div>
        );
      case 'text':
        return <p className="text-gray-600">{widget.content}</p>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 relative">
      <button
        onClick={handleRemove}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
      <h3 className="text-lg font-semibold mb-4">{widget.name}</h3>
      <div className="flex justify-center items-center h-48">
        {renderWidget()}
      </div>
      {widget.total && (
        <p className="text-sm text-gray-500 mt-2">Total: {widget.total}</p>
      )}
    </div>
  );
}

export default Widget;