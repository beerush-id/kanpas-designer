import type { Action } from '@services/journey';

export type WheelMenuItem = {
  icon?: string;
  label?: string;
  click?: () => void;
  angle?: number;
  active?: boolean;
  children?: WheelMenuItem[];
}

export function createCompactActionMenu(forAction: Action[]): WheelMenuItem[] {
  return [
    {
      icon: 'html',
      label: 'Show Element',
      children: [
        {
          icon: 'format_h1',
          label: 'Heading'
        },
        {
          icon: 'article',
          label: 'Paragraph'
        },
        {
          icon: 'add_link',
          label: 'Link'
        },
        {
          icon: 'assignment',
          label: 'Form'
        },
        {
          icon: 'input',
          label: 'Input'
        },
        {
          icon: 'smart_button',
          label: 'Button'
        },
        {
          icon: 'crop_landscape',
          label: 'Section'
        },
      ],
    },
    {
      icon: 'category',
      label: 'Show Component',
      children: [
        {
          icon: 'playlist_add',
          label: 'New Component'
        },
        {
          icon: 'playlist_play',
          label: 'Existing Existing'
        },
      ],
    },
    {
      icon: 'function',
      label: 'Call Function',
      children: [
        {
          icon: 'playlist_add',
          label: 'New Function'
        },
        {
          icon: 'playlist_play',
          label: 'Existing Function'
        },
      ],
    },
    {
      icon: 'electrical_services',
      label: 'Call Service',
      children: [
        {
          icon: 'playlist_add',
          label: 'New Service'
        },
        {
          icon: 'playlist_play',
          label: 'Existing Service'
        },
      ],
    },
    {
      icon: 'local_library',
      label: 'Read State',
      children: [
        {
          icon: 'data_object',
          label: 'Named Store'
        },
        {
          icon: 'dataset',
          label: 'Persistent Store'
        },
      ],
    },
    {
      icon: 'history_edu',
      label: 'Write State',
      children: [
        {
          icon: 'data_object',
          label: 'Named Store'
        },
        {
          icon: 'dataset',
          label: 'Persistent Store'
        },
      ],
    },
  ];
}
