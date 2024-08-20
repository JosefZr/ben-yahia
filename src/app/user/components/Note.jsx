import React from 'react';

const Note = React.memo(function NoteComponent({ value, onChange }) {
  return (
    <textarea
      id="note"
      value={value}
      onChange={onChange}
      className='w-full p-2 border rounded'
      placeholder='ex: Annual mothly chack-up'
      rows={4}
    />
  );
});

export default Note;