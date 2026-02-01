import { useGooglePlayIntegration } from '../../hooks/useGooglePlayIntegration';
import { UI_SPECS } from '../../constants/config';
import { GooglePlayHeader } from './GooglePlayHeader';
import { PlayStoreApiSection } from './PlayStoreApiSection';
import { WebhookConfigSection } from './WebhookConfigSection';
import { ActionButton } from './ActionButton';

export default function GooglePlayIntegration() {
  const {
    form,
    selectedFile,
    connectionStatus,
    loadingStates,
    handlers,
  } = useGooglePlayIntegration();

  const {
    register,
    formState: { errors },
  } = form;

  const handleBack = () => {
    // Navigation logic - could be passed as prop or use router
    window.history.back();
  };

  const handleCancel = () => {
    // Cancel logic - reset form or navigate away
    form.reset();
  };

  return (
    <div
      className="bg-white min-h-full"
      style={{ maxWidth: `${UI_SPECS.FRAME_WIDTH}px`, margin: '0 auto' }}
    >
      <GooglePlayHeader onBack={handleBack} />

      <div className="px-6">
        <div
          className="mx-auto space-y-6"
          style={{ maxWidth: `${UI_SPECS.CONTENT_MAX_WIDTH}px` }}
        >
          <PlayStoreApiSection
            register={register}
            errors={errors}
            selectedFile={selectedFile}
            connectionStatus={connectionStatus}
            loadingStates={loadingStates}
            onFileSelect={handlers.handleFileSelect}
            onTestConnection={handlers.handleTestConnection}
            onSaveConfiguration={handlers.handleSaveConfiguration}
            onCancel={handleCancel}
          />

          <WebhookConfigSection
            register={register}
            errors={errors}
            loadingStates={loadingStates}
            onSendTestEvent={handlers.handleSendTestEvent}
          />

          <div className="flex justify-end gap-4 pb-8">
            <ActionButton
              variant="primary"
              isLoading={loadingStates.isConnecting}
              onClick={handlers.handleConnectApp}
            >
              Connect App
            </ActionButton>

            <ActionButton variant="ghost" onClick={handleCancel}>
              Cancel
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
}
