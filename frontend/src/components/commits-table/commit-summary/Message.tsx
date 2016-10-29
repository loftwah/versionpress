import * as React from 'react';
import { observer } from 'mobx-react';

import DetailsLevelButtons from './DetailsLevelButtons';
import MergeIcon from './MergeIcon';
import DetailsLevel from '../../../enums/DetailsLevel';

interface MessageProps {
  commit: Commit;
  detailsLevel: DetailsLevel;
  onDetailsLevelChange(detailsLevel: DetailsLevel): void;
}

const Message: React.StatelessComponent<MessageProps> = ({ commit, detailsLevel, onDetailsLevelChange }) => (
  <div className='column-message' style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between' }}>
    <div>
      {commit.isMerge &&
        <MergeIcon />
      }
      {renderMessage(commit.message)}
    </div>
    {detailsLevel !== DetailsLevel.None &&
      <DetailsLevelButtons
        detailsLevel={detailsLevel}
        onDetailsLevelChange={onDetailsLevelChange}
      />
    }
  </div>
);

function renderMessage(message: string) {
  const messageChunks = /(.*)'(.*)'(.*)/.exec(message);

  if (!messageChunks || messageChunks.length !== 4) {
    return <span>{message}</span>;
  }

  return (
    <span>
      {messageChunks[1] !== '' && renderMessage(messageChunks[1])}
      {messageChunks[2] !== '' && <span className='identifier'>{messageChunks[2]}</span>}
      {messageChunks[3] !== '' && renderMessage(messageChunks[3])}
    </span>
  );
}

export default observer(Message);