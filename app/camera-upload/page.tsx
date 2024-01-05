import { NextPage } from 'next';
import CaptureModal from '@/app/components/CaptureModal/CaptureModal';
import CaptureContainer from '@/app/components/ImageCapture/CaptureContainer';

const Page: NextPage = () => (
  <>
    <h1>Upload</h1>
    <CaptureModal>
      <CaptureContainer />
    </CaptureModal>
  </>
);

export default Page;
