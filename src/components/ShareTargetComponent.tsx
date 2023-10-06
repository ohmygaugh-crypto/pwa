import { ExtractSharedData } from '../utils/shareUtils';

const ShareTargetComponent: React.FC = () => {
  const sharedData = ExtractSharedData();

  // Use optional chaining and provide default/fallback values
  const title = sharedData?.title ?? 'No Title Provided';
  const text = sharedData?.text ?? 'No Text Provided';
  const url = sharedData?.url ?? '#';

  return (
    <div>
      <h1>Shared Title: {title}</h1>
      <p>Shared Text: {text}</p>
      {/* Only render the link if a valid URL is provided */}
      {url && <a href={url}>Shared URL</a>}
    </div>
  );
};

export default ShareTargetComponent;