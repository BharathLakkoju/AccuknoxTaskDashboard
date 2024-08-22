import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [
    {
      id: 'cspm',
      name: 'CSPM Executive Dashboard',
      widgets: [
        {
          id: 'cloud-accounts',
          name: 'Cloud Accounts',
          type: 'pie',
          data: [
            { name: 'Connected', value: 2, color: '#4338ca' },
            { name: 'Not Connected', value: 1, color: '#e5e7eb' },
          ],
        },
        {
          id: 'cloud-account-risk',
          name: 'Cloud Account Risk Assessment',
          type: 'pie',
          data: [
            { name: 'Failed', value: 1689, color: '#ef4444' },
            { name: 'Warning', value: 681, color: '#f59e0b' },
            { name: 'Not Available', value: 38, color: '#6b7280' },
            { name: 'Passed', value: 7251, color: '#10b981' },
          ],
        },
      ],
    },
    {
      id: 'cwpp',
      name: 'CWPP Dashboard',
      widgets: [
        {
          id: 'namespace-alerts',
          name: 'Top 5 Namespace Specific Alerts',
          type: 'text',
          content: 'No Graph data available!',
        },
        {
          id: 'workload-alerts',
          name: 'Workload Alerts',
          type: 'text',
          content: 'No Graph data available!',
        },
      ],
    },
    {
      id: 'registry-scan',
      name: 'Registry Scan',
      widgets: [
        {
          id: 'image-risk',
          name: 'Image Risk Assessment',
          type: 'bar',
          data: [
            { name: 'Critical', value: 5, color: '#ef4444' },
            { name: 'High', value: 760, color: '#f59e0b' },
          ],
          total: 1470,
        },
        {
          id: 'image-security',
          name: 'Image Security Issues',
          type: 'bar',
          data: [
            { name: 'Critical', value: 2, color: '#ef4444' },
            { name: 'High', value: 2, color: '#f59e0b' },
          ],
          total: 2,
        },
      ],
    },
  ],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find(c => c.id === categoryId);
      if (category) {
        category.widgets.push(widget);
      }
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(c => c.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter(w => w.id !== widgetId);
      }
    },
  },
});

export const { addWidget, removeWidget } = dashboardSlice.actions;

export const store = configureStore({
  reducer: {
    dashboard: dashboardSlice.reducer,
  },
});