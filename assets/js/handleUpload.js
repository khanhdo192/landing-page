const preImage = document.querySelector('#preImg');
const inputUpload = document.querySelector('#inputUploadImg');

const handlePreview = () => {
  inputUpload.addEventListener('change', (e) => {
    const isImg = inputUpload.files[0];
    // console.log(isImg);
    // const imgPreUrl = URL.createObjectURL(isImg);
    const fileImg = new FileReader();
    if (isImg) {
      fileImg.readAsDataURL(isImg);
      fileImg.onloadend = (e) => {
        // console.log(e.target.result);
        preImage.src = e.target.result;
      };
    }
  });
};

const getUserData = () => {
  const data = JSON.parse(localStorage.getItem('userInfo'));
  document.querySelector('#nameAuth').value = data.name;
  document.querySelector('#emailAuth').value = data.email;
  document.querySelector('#pwCheck').value = data.password;
  document.querySelector('#userId').value = data.id;
  document.querySelector('#preImg').src = !data.profileImg
    ? './assets/images/default-ava.png'
    : data.profileImg;

  // console.log(data);
};

handlePreview();
getUserData();
