// import React, { useState, useRef } from 'react';
// import styled from "styled-components";

// function ImageUploadCard(props) {

    
//       return (
//         <OutDiv>
//         {selectedImage ? (
//             <ImagePreview src={selectedImage} alt="Selected profile"/>
//         ) : (
//             <UploadContainer>사진을 업로드 해주세요!</UploadContainer>
//         )}
//         <HiddenFileInput 
//             ref={fileInputRef}
//             id="fileInput"
//             type="file"
//             onChange={handleImageChange}
//         />
//         </OutDiv>
//       );
// }

// export default ImageUploadCard;

// const OutDivInput = styled.div`
//     width: 100%;
//     height: 100%;
//     >label {
//       width: 100%;
//       height: 100%;
//     }
// `;

// const ImagePreview = styled.img`
// width: 600px;
// height: 550px;
// border: 1px solid #B5B5B5;
// margin-left: 120px;
// margin-top: 39px;
// border-radius: 5px;
// `;

// const UploadContainer = styled.div`
//     width: 600px;
//     height: 550px;
//     border: 1px solid #B5B5B5;
//     margin-left: 120px;
//     margin-top: 39px;
//     border-radius: 5px;
//     background-color: white;
//     text-align: center;
//     line-height: 550px;
//     font-weight: bold;
//     font-size: 20px;
// `;

// const HiddenFileInput = styled.input`
//   display: none;
// `;

