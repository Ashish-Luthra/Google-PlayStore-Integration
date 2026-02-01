import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { GooglePlayFormData, ConnectionStatus, LoadingStates } from '../../types/googlePlay';
import { VALIDATION_PATTERNS } from '../../constants/config';
import { FormInput } from './FormInput';
import { FormTextarea } from './FormTextarea';
import { FileUpload } from './FileUpload';
import { ActionButton } from './ActionButton';
import { ConnectionStatusBanner } from './ConnectionStatusBanner';

interface PlayStoreApiSectionProps {
  register: UseFormRegister<GooglePlayFormData>;
  errors: FieldErrors<GooglePlayFormData>;
  selectedFile: File | null;
  connectionStatus: ConnectionStatus;
  loadingStates: LoadingStates;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTestConnection: () => void;
  onSaveConfiguration: () => void;
  onCancel: () => void;
}

export function PlayStoreApiSection({
  register,
  errors,
  selectedFile,
  connectionStatus,
  loadingStates,
  onFileSelect,
  onTestConnection,
  onSaveConfiguration,
  onCancel,
}: PlayStoreApiSectionProps) {
  return (
    <section
      className="border border-[#abb8ca] rounded-md px-9 py-3.5"
      aria-labelledby="play-store-api-heading"
    >
      <h2
        id="play-store-api-heading"
        className="font-inter font-medium text-base text-[#0e0f11] leading-7 tracking-tight mb-6"
      >
        Play Store API Connect API
      </h2>

      <div className="flex gap-10 mb-6">
        <FormInput
          {...register('packageName', {
            required: 'App Package Name is required',
            pattern: {
              value: VALIDATION_PATTERNS.PACKAGE_NAME,
              message: 'Invalid package name format (e.g., com.company.app)',
            },
          })}
          label="App Package Name"
          required
          placeholder="com.yourcompany.yourapp"
          helpText="Your Android app's unique package identifier (found in Google Play Console)"
          error={errors.packageName?.message}
        />

        <FormInput
          {...register('serviceAccountEmail', {
            required: 'Service Account Email is required',
            pattern: {
              value: VALIDATION_PATTERNS.EMAIL,
              message: 'Invalid email format',
            },
          })}
          type="email"
          label="Service Account Email"
          required
          placeholder="service-account@project-id.iam.gserviceaccount.com"
          helpText="The email address of your Google Cloud service account"
          error={errors.serviceAccountEmail?.message}
        />
      </div>

      <FileUpload
        id="json-key-upload"
        label="Service Account Key (JSON) *"
        selectedFile={selectedFile}
        onChange={onFileSelect}
        helpText="Download once when creating the API key (cannot be downloaded again)"
      />

      <FormTextarea
        {...register('jsonKeyContent', {
          validate: (value) => {
            if (!value) return 'JSON key content is required';
            try {
              JSON.parse(value);
              return true;
            } catch {
              return 'Invalid JSON format';
            }
          },
        })}
        label="Or Paste JSON Key Content"
        placeholder='{"type": "service_account", "project_id": "your-project", ...}'
        helpText="Paste the entire contents of your service account JSON key file"
        error={errors.jsonKeyContent?.message}
      />

      <ConnectionStatusBanner status={connectionStatus} />

      <div className="flex gap-8 items-center">
        <ActionButton
          variant="secondary"
          isLoading={loadingStates.isTestingConnection}
          onClick={onTestConnection}
        >
          Test Connection
        </ActionButton>

        <ActionButton
          variant="primary"
          isLoading={loadingStates.isSaving}
          onClick={onSaveConfiguration}
        >
          Save Configuration
        </ActionButton>

        <ActionButton variant="ghost" onClick={onCancel}>
          Cancel
        </ActionButton>
      </div>
    </section>
  );
}
