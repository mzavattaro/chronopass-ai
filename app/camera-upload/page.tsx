import { NextPage } from 'next';
import CaptureModal from '@/app/components/CaptureModal/CaptureModal';
import ImageCapture from '@/app/components/ImageCapture/ImageCapture';

const Page: NextPage = () => (
  <>
    <h1>Upload</h1>
    <CaptureModal>
      <ImageCapture />
    </CaptureModal>
  </>
);

export default Page;
