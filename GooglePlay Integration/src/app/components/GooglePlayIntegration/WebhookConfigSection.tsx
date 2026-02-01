import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { GooglePlayFormData, LoadingStates } from '../../types/googlePlay';
import { VALIDATION_PATTERNS } from '../../constants/config';
import { FormInput } from './FormInput';
import { ActionButton } from './ActionButton';

interface WebhookConfigSectionProps {
  register: UseFormRegister<GooglePlayFormData>;
  errors: FieldErrors<GooglePlayFormData>;
  loadingStates: LoadingStates;
  onSendTestEvent: () => void;
}

export function WebhookConfigSection({
  register,
  errors,
  loadingStates,
  onSendTestEvent,
}: WebhookConfigSectionProps) {
  return (
    <section
      className="border border-[#abb8ca] rounded-md px-9 py-3.5"
      aria-labelledby="webhook-config-heading"
    >
      <h2
        id="webhook-config-heading"
        className="font-inter font-medium text-base text-[#0e0f11] leading-7 tracking-tight mb-6"
      >
        Webhook Configuration
      </h2>

      <div className="mb-6">
        <FormInput
          {...register('webhookUrl', {
            required: 'Webhook URL is required',
            pattern: {
              value: VALIDATION_PATTERNS.HTTPS_URL,
              message: 'Webhook URL must start with https://',
            },
          })}
          type="url"
          label="Webhook URL"
          required
          placeholder="https://yourdomain.com/webhooks/google-play"
          helpText="Paste your secure HTTPS endpoint URL. If you are using a third-party service, use the URL provided in their dashboard. Ensure your server responds with a 200 OK status"
          error={errors.webhookUrl?.message}
        />
      </div>

      <div className="mb-6 max-w-[400px]">
        <FormInput
          {...register('signingSecret')}
          type="password"
          label="Signing Secret"
          placeholder="xxxxxxxx"
          helpText="Optional secret key for webhook signature verification"
        />
      </div>

      <ActionButton
        variant="secondary"
        isLoading={loadingStates.isSendingTest}
        onClick={onSendTestEvent}
      >
        Send Test Event
      </ActionButton>
    </section>
  );
}
