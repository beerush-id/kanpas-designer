import { toast } from '@services/toast.js';

export async function copy(text: string | object, message?: string) {
  if (typeof text === 'object') text = JSON.stringify(text, null, 2);

  try {
    await navigator.clipboard.writeText(text);
    toast.info({ subtitle: message || 'Text successfully copied.' });
  } catch (error) {
    toast.error({ subtitle: 'Can not copy text to clipboard.' });
  }
}
