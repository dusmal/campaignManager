import React from 'react';

interface AddNewButtonProps {
  onClick: () => void;
}

const AddNewButton = ({ onClick }: AddNewButtonProps) => {
  return (
    <button className="add-new-button" onClick={onClick}>
      ＋add new
    </button>
  );
};

export default AddNewButton;