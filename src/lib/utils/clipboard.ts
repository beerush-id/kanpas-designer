import { toast } from '@services/toast';

export async function copy(text: string, message?: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.info({ subtitle: message || 'Text successfully copied.' });
  } catch (error) {
    toast.error({ subtitle: 'Can not copy text to clipboard.' });
  }
}
