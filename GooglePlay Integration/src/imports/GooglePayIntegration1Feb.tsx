import svgPaths from "./svg-b11ecc1lfz";

function Icon() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        <g clipPath="url(#clip0_2_643)" id="Icon">
          <path d={svgPaths.pdc0c300} fill="var(--fill-0, #2196F3)" id="Vector" />
          <path d={svgPaths.p2afaea80} fill="var(--fill-0, #FFC107)" id="Vector_2" />
          <path d={svgPaths.p3b6b9c10} fill="var(--fill-0, #4CAF50)" id="Vector_3" />
          <path d={svgPaths.p2c94b180} fill="var(--fill-0, #F44336)" id="Vector_4" />
        </g>
        <defs>
          <clipPath id="clip0_2_643">
            <rect fill="white" height="36" width="36" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function StoreBadge() {
  return (
    <div className="absolute content-stretch flex gap-[27px] items-center left-[261px] p-[8px] top-[43px]" data-name="StoreBadge">
      <Icon />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[48px] not-italic relative shrink-0 text-[28px] text-black tracking-[-0.308px]">Google Play</p>
    </div>
  );
}

function ArrowLeftIcon() {
  return (
    <div className="absolute left-[232px] size-[28.8px] top-[61px]" data-name="Arrow Left Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.8 28.8">
        <g id="Arrow Left Icon">
          <path clipRule="evenodd" d={svgPaths.p34a0db00} fill="var(--fill-0, #0F2744)" fillRule="evenodd" id="Arrow (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function BootstrapIcons() {
  return (
    <div className="absolute contents inset-0" data-name="Bootstrap-Icons">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="box-arrow-up-right">
          <path d={svgPaths.p3bb91b70} fill="var(--fill-0, #0F172A)" id="Vector" />
          <path d={svgPaths.p1f8fbc00} fill="var(--fill-0, #0F172A)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Icons() {
  return (
    <div className="absolute contents inset-0" data-name="Icons">
      <BootstrapIcons />
    </div>
  );
}

function ArrowUpIcon() {
  return (
    <div className="absolute left-[1367px] overflow-clip size-[14px] top-[68px]" data-name="Arrow Up Icon">
      <Icons />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pb-[8px] relative shrink-0 w-full" data-name="Content">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[#0e0f11] text-[16px] tracking-[-0.224px] w-full whitespace-pre-wrap">Webhook Configuration</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[34px] rounded-[8px] top-[7px] w-[1200px]" data-name="Heading">
      <Content />
    </div>
  );
}

function InputBox() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-between p-[8px] relative rounded-[6px] shrink-0 w-[1016px]" data-name="InputBox">
      <div aria-hidden="true" className="absolute border border-[#ccd6e0] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#738096] text-[13px]">{`https://yourdomain.com/webhooks/appstore `}</p>
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[39px] top-[51px] w-[1015px]" data-name="TextInput">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] min-w-full not-italic relative shrink-0 text-[14px] text-black w-[min-content] whitespace-pre-wrap">Weebhook URL*</p>
      <InputBox />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[#738096] text-[13px] w-[min-content] whitespace-pre-wrap">Paste your secure HTTPS endpoint URL. If you are using a third-party service, use the URL provided in their dashboard. Ensure your server responds with a 200 OK status</p>
    </div>
  );
}

function InputBox1() {
  return (
    <div className="h-[40px] relative rounded-[6px] shrink-0 w-full" data-name="InputBox">
      <div aria-hidden="true" className="absolute border border-[#ccd6e0] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[8px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#738096] text-[13px]">{`xxxxxxxx `}</p>
        </div>
      </div>
    </div>
  );
}

function TextInput1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[39px] top-[196px] w-[400px]" data-name="TextInput">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[14px] text-black w-full whitespace-pre-wrap">Signing Secret</p>
      <InputBox1 />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#edf2f7] content-stretch flex gap-[4px] h-[40px] items-center justify-center left-[39px] px-[12px] py-[8px] rounded-[5px] top-[288px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#abb8ca] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#333] text-[14px] tracking-[0.21px]">Send Test Event</p>
    </div>
  );
}

function WebhookDetails() {
  return (
    <div className="absolute border border-[#abb8ca] border-solid h-[372px] left-[242px] overflow-clip rounded-[6px] top-[760px] w-[1140px]" data-name="WebhookDetails">
      <Heading />
      <TextInput />
      <TextInput1 />
      <Button />
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pb-[8px] relative shrink-0 w-full" data-name="Content">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[#0e0f11] text-[16px] tracking-[-0.224px] w-full whitespace-pre-wrap">Play Store API Connect API</p>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col h-[36px] items-start relative rounded-[8px] shrink-0 w-[1200px]" data-name="Heading">
      <Content1 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon" opacity="0">
          <path d={svgPaths.p359eb200} fill="var(--fill-0, #A5AEBF)" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p39efdf40} fill="var(--fill-0, #728095)" fillRule="evenodd" id="Arrow (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function InputBox2() {
  return (
    <div className="h-[40px] relative rounded-[6px] shrink-0 w-full" data-name="InputBox">
      <div aria-hidden="true" className="absolute border border-[#ccd6e0] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[8px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#738096] text-[13px]">
            <span className="leading-[normal]">com.yourcompany.allyvate</span>
            <span className="leading-[normal]">{` `}</span>
          </p>
          <Icon1 />
        </div>
      </div>
    </div>
  );
}

function TextInput2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative" data-name="TextInput">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[14px] text-black w-full whitespace-pre-wrap">App Package Name *</p>
      <InputBox2 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#738096] text-[13px] w-full whitespace-pre-wrap">{`Your Android app's unique package identifier (found in Google Play Console)`}</p>
    </div>
  );
}

function InputBox3() {
  return (
    <div className="h-[40px] relative rounded-[6px] shrink-0 w-full" data-name="InputBox">
      <div aria-hidden="true" className="absolute border border-[#ccd6e0] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[8px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#a1adbf] text-[14px]">service-account@project-id.iam.gserviceaccount.com</p>
        </div>
      </div>
    </div>
  );
}

function TextInput3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-end min-h-px min-w-px relative" data-name="TextInput">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[14px] text-black w-full whitespace-pre-wrap">
        <span className="leading-[normal]">{`Service Account Email `}</span>
        <span className="leading-[normal]">*</span>
      </p>
      <InputBox3 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#738096] text-[13px] w-full whitespace-pre-wrap">The email address of your Google Cloud service account</p>
    </div>
  );
}

function InputRowAppIdBundleId() {
  return (
    <div className="content-stretch flex gap-[40px] items-start py-[10px] relative shrink-0 w-[1020px]" data-name="Input Row – AppID / BundleID">
      <TextInput2 />
      <TextInput3 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-start leading-[normal] not-italic relative shrink-0 w-[268px] whitespace-pre-wrap">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#2e3847] text-[14px] w-full">Choose JSON key file</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#738096] text-[12px] w-full">Upload your service account key file (.json)</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[9px] items-center py-[10px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#abb8ca] border-dashed inset-0 pointer-events-none" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[20px] text-black">🔐</p>
      <Frame />
    </div>
  );
}

function PrivateKeyUpload() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[1020px]" data-name="PrivateKeyUpload">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#2e3847] text-[14px] w-full whitespace-pre-wrap">Service Account Key (JSON) *</p>
      <Frame1 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#738096] text-[13px] w-full whitespace-pre-wrap">Download once when creating the API key (cannot be downloaded again)</p>
    </div>
  );
}

function InputBox4() {
  return (
    <div className="h-[80px] relative rounded-[6px] shrink-0 w-full" data-name="InputBox">
      <div aria-hidden="true" className="absolute border border-[#ccd6e0] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="content-stretch flex items-start justify-between p-[8px] relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#a1adbf] text-[13px]">{`{"type": "service_account", "project_id": "your-project", ...}`}</p>
      </div>
    </div>
  );
}

function PrivateKey() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start py-[10px] relative shrink-0 w-[1016px]" data-name="Private Key">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#2e3847] text-[14px] w-full whitespace-pre-wrap">Or Paste JSON Key Content</p>
      <InputBox4 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#738096] text-[13px] w-full whitespace-pre-wrap">Paste the entire contents of your service account JSON key file</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#edf2f7] content-stretch flex gap-[4px] h-[40px] items-center justify-center px-[12px] py-[8px] relative rounded-[5px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#abb8ca] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#333] text-[14px] tracking-[0.21px]">Test Connection</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#2773ff] content-stretch flex gap-[4px] h-[40px] items-center justify-center px-[12px] py-[8px] relative rounded-[5px] shrink-0" data-name="Button">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[#f4f8ff] text-[14px] tracking-[0.21px]">Save Configuration</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex gap-[4px] h-[40px] items-center justify-center px-[12px] py-[8px] relative rounded-[5px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#ccd6e0] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[#808080] text-[14px] tracking-[0.21px]">Cancel</p>
    </div>
  );
}

function Buttons() {
  return (
    <div className="content-stretch flex gap-[30px] items-start py-[10px] relative shrink-0" data-name="Buttons">
      <Button1 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function AppApiDetails() {
  return (
    <div className="absolute left-[242px] rounded-[6px] top-[192px] w-[1140px]" data-name="AppAPIDetails">
      <div className="content-stretch flex flex-col gap-[10px] items-start overflow-clip px-[35px] py-[14px] relative rounded-[inherit] w-full">
        <Heading1 />
        <InputRowAppIdBundleId />
        <PrivateKeyUpload />
        <PrivateKey />
        <Buttons />
      </div>
      <div aria-hidden="true" className="absolute border border-[#abb8ca] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-[#2773ff] content-stretch flex gap-[4px] h-[40px] items-center justify-center left-[1176px] px-[12px] py-[8px] rounded-[5px] top-[1214px]" data-name="Button">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[#f4f8ff] text-[14px] tracking-[0.21px]">Connect App</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[40px] items-center justify-center left-[1310px] px-[12px] py-[8px] rounded-[5px] top-[1214px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#ccd6e0] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[#808080] text-[14px] tracking-[0.21px]">Cancel</p>
    </div>
  );
}

export default function GooglePayIntegration1Feb() {
  return (
    <div className="bg-white relative size-full" data-name="Google Pay Integration_1Feb">
      <StoreBadge />
      <ArrowLeftIcon />
      <p className="absolute font-['Manrope:Regular',sans-serif] leading-[28px] left-[332px] not-italic text-[#636b75] text-[16px] top-[107px] tracking-[-0.176px]">Connect using Google Play API</p>
      <ArrowUpIcon />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[28px] left-[1255px] not-italic text-[14px] text-black top-[61px] tracking-[-0.154px]">Documentation</p>
      <div className="absolute h-0 left-[240px] top-[159px] w-[1140px]" data-name="Horizontal divider">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1140 1">
            <line id="Horizontal divider" stroke="var(--stroke-0, #8798AD)" x2="1140" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <WebhookDetails />
      <AppApiDetails />
      <Button4 />
      <Button5 />
    </div>
  );
}