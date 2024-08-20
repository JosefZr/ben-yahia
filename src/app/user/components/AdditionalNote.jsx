import React from 'react';

const AdditionalNote = React.memo(function AdditionalNoteComponent({ value, onChange }) {
    return (
        <textarea
        id="note"
        value={value}
        onChange={onChange}
        className='w-full p-2 border rounded'
        placeholder='ex: Prefer afternoon, if possible'
        rows={4}
        />
    );
});

export default AdditionalNote;