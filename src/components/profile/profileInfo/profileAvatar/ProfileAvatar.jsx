import React, { useState, useEffect } from 'react';
import { Upload } from 'antd';
import Pen from '../../../SVGs/Pen.jsx';
import style from './ProfileAvatar.module.scss';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = (error) => reject(error);
  });

const ProfileAvatar = ({ profileUrl, onAvatarChange }) => {
  const [imageUrl, setImageUrl] = useState();
  useEffect(() => {
    setImageUrl(profileUrl);
  }, [profileUrl]);

  const beforeUpload = async (file) => {
    const preview = await getBase64(file);
    setImageUrl(preview);
    onAvatarChange(preview);
    return false; // Prevent default upload behavior
  };

  const uploadButton = (
    <button className={style.uploadBtn} type="button">
      <Pen />
    </button>
  );
  return (
    <>
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
      >
        {imageUrl ? (
          <img
            src={profileUrl ? `data:image/png;base64,${imageUrl}` : imageUrl}
            alt="avatar"
            className={style.uploadedImg}
            style={{
              width: '95%',
              borderRadius: '100%',
            }}
          />
        ) : null}
        {uploadButton}
      </Upload>
    </>
  );
};
export default ProfileAvatar;
