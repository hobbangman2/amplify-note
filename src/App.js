import { CreateNote, NavBar, NoteUICollection, studioTheme, UpdateNote } from './ui-components';
import { useState } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { DataStore } from 'aws-amplify'

function App({ signOut }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateNote, setupdateNote] = useState(false);

  return (
    <>
      <NavBar
        width="100%" marginBottom="20px"
        overrides={{
          Button31632483: { onClick: () => setShowCreateModal(true) },
          Button31632487: {
            onClick: async () => {
              await DataStore.clear();
              signOut();
            }
          }
        }}
      />

      <div className='container'>
        <NoteUICollection overrideItems={({ item, idx }) => {
          return {
            overrides: {
              Vector31472747 : {
                as: 'button',
                onClick: () => {
                  setShowUpdateModal(true)
                  setupdateNote(item)
                }
              }
            }
          }
        }}/>
      </div>
      <div className='modal' style={{ display: showCreateModal === false && 'none' }}>
        <CreateNote overrides={{
          MyIcon: {
            as: 'Button',
            onClick: () => setShowCreateModal(false)
          }
        }}
        />
      </div>
      <div className='modal' style={{ display: showUpdateModal === false && 'none' }}>
        <UpdateNote
          note={updateNote} overrides={{
          MyIcon: {
            as: 'Button',
            onClick: () => setShowUpdateModal(false)
          }
        }}/>
      </div>
    </>
  );
}

// export default App;
export default withAuthenticator(App);