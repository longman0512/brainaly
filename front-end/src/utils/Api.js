/* eslint-disable prefer-const */
/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable no-alert */
/* eslint-disable import/prefer-default-export */
import Axios from 'axios';
import cogoToast from 'cogo-toast';
import global from 'src/utils/global';

Axios.defaults.baseURL = `${global.serverUrl}`;

export async function signUp(userInfo) {
  const DATA = await Axios.post('signup', userInfo).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
    return res.data;
  }).catch((err) => {
    console.log(err);
  });
  return DATA;
}

export async function signIn(userInfo) {
  const DATA = await Axios.post('signin', userInfo).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
    return res.data;
  }).catch((err) => {
    console.log(err);
  });
  return DATA;
}

export async function adminSignIn(userInfo) {
  const DATA = await Axios.post('adminsignin', userInfo).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
    return res.data;
  }).catch((err) => {
    console.log(err);
  });
  return DATA;
}

export async function getUserData() {
  const DATA = await Axios.post('getuserdata').then((res) => {
    if (res.status === 200) {
      return res.data;
    }
    return res.data;
  }).catch((err) => {
    console.log(err);
  });
  return DATA;
}

export async function toggleUserStateApi(data) {
  const DATA = await Axios.post('toggleUserStatus', data).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
    return res.data;
  }).catch((err) => {
    console.log(err);
  });
  return DATA;
}

export async function getTransactionData() {
  const DATA = await Axios.post('gettransactions').then((res) => {
    if (res.status === 200) {
      return res.data;
    }
    return res.data;
  }).catch((err) => {
    console.log(err);
  });
  return DATA;
}

export async function resendVerifyCode(data) {
  const DATA = await Axios.post('resendverifycode', data).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
    return res.data;
  }).catch((err) => {
    console.log(err);
  });
  return DATA;
}

export async function getContactData() {
  const DATA = await Axios.post('getcontactdata').then((res) => {
    if (res.status === 200) {
      return res.data;
    }
    return res.data;
  }).catch((err) => {
    console.log(err);
  });
  return DATA;
}

export async function emailVerify(data) {
  const DATA = await Axios.post('emailverify', data).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
    return res.data;
  }).catch((err) => {
    console.log(err);
  });
  return DATA;
}

export async function getNewContactData() {
  const DATA = await Axios.post('getnewcontactdata').then((res) => {
    if (res.status === 200) {
      return res.data;
    }
    return res.data;
  }).catch((err) => {
    console.log(err);
  });
  return DATA;
}

export async function getDashboardInfo() {
  const DATA = await Axios.post('getDashboardInfo').then((res) => {
    if (res.status === 200) {
      return res.data;
    }
    return res.data;
  }).catch((err) => {
    console.log(err);
  });
  return DATA;
}

export async function newQuiz(data) {
  const DATA = await Axios.post('newquiz', data).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
    cogoToast.warn('Add Failed', { position: 'bottom-right' });
    return res.data;
  }).catch((err) => {
    cogoToast.warn(err, { position: 'bottom-right' });
  });
  return DATA;
}
export async function getQuizById(id) {
  const DATA = await Axios.post('getbyid', id).then((res) => {
    if (res.status === 200) {
      return res.data.data;
    }
    return res.data.data;
  });
  return DATA;
}
export async function getQuizList(id) {
  const DATA = await Axios.post('getquizlist', id).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
    return res.data;
  });
  return DATA;
}

export async function getQuizPageApi(query) {
  console.log(query);
  const DATA = await Axios.post('getquizpage', query).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
    return res.data;
  });
  return DATA;
}

export async function searchQuizApi(query) {
  console.log(query);
  const DATA = await Axios.post('searchquiz', query).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
    return res.data;
  });
  return DATA;
}

export async function searchColApi(query) {
  console.log(query);
  const DATA = await Axios.post('searchcol', query).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
    return res.data;
  });
  return DATA;
}

export async function updateQuizData(data) {
  const DATA = await Axios.post('updatequiz', data).then((res) => {
    if (res.status === 200) {
      return res.data.data;
    }
    return res.data.data;
  });
  return DATA;
}
export async function imageUpload(file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await Axios.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*'
    },
  });
  return res;
}
export async function deleteQuiz(id) {
  const DATA = await Axios.post('deletequiz', id).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
    return res.data;
  });
  return DATA;
}

// =============Collection alalal

export async function newCollection(data) {
  const DATA = await Axios.post('newcollection', data).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
    cogoToast.warn('Add Failed', { position: 'bottom-right' });
    return res.data;
  }).catch((err) => {
    cogoToast.warn(err, { position: 'bottom-right' });
  });
  return DATA;
}

export async function deleteColApi(id) {
  const DATA = await Axios.post('deleteCol', id).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
    return res.data;
  });
  return DATA;
}

export async function getCollectionList(id) {
  console.log(id);
  const DATA = await Axios.post('getcollist', id).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
    return res.data;
  });
  return DATA;
}

export async function getColPageApi(data) {
  console.log(data);
  const DATA = await Axios.post('getcolpage', data).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
    return res.data;
  });
  return DATA;
}

export async function getColById(id) {
  const DATA = await Axios.post('getcolbyid', id).then((res) => {
    if (res.status === 200) {
      return res.data.data;
    }
    return res.data.data;
  });
  return DATA;
}
export async function updateColQuiz(data) {
  const DATA = await Axios.post('updatequizlist', data).then((res) => {
    if (res.status === 200) {
      return res.data.data;
    }
    cogoToast.warn('Add Failed', { position: 'bottom-right' });
    return res.data.data;
  });
  return DATA;
}
export async function updateColData(data) {
  const DATA = await Axios.post('updatecol', data).then((res) => {
    if (res.status === 200) {
      return res.data.data;
    }
    cogoToast.warn('Add Failed', { position: 'bottom-right' });
    return res.data.data;
  });
  return DATA;
}

export async function sendContactAnswer(data) {
  const DATA = await Axios.post('sendcontactanswer', data).then((res) => {
    if (res.status === 200) {
      return res.data.data;
    }
    cogoToast.warn('Add Failed', { position: 'bottom-right' });
    return res.data.data;
  });
  return DATA;
}
// ============= Class sectioin
export async function newClass(data) {
  const DATA = await Axios.post('newclass', data).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
    cogoToast.warn('Add Failed', { position: 'bottom-right' });
    return res.data;
  }).catch((err) => {
    cogoToast.warn(err, { position: 'bottom-right' });
  });
  return DATA;
}

export async function deleteClass(id) {
  const DATA = await Axios.post('deleteclass', id).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
    return res.data;
  });
  return DATA;
}

export async function getClassList(id) {
  const DATA = await Axios.post('getclasslist', id).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
    return res.data;
  });
  return DATA;
}

export async function getClassListAll(id) {
  const DATA = await Axios.post('getclasslistall', id).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
    return res.data;
  });
  return DATA;
}

export async function getClassById(id) {
  const DATA = await Axios.post('getclassbyid', id).then((res) => {
    if (res.status === 200) {
      return res.data.data;
    }
    return res.data.data;
  });
  return DATA;
}
export async function updateClassData(data) {
  const DATA = await Axios.post('updateclass', data).then((res) => {
    if (res.status === 200) {
      return res.data.data;
    }
    cogoToast.warn('Add Failed', { position: 'bottom-right' });
    return res.data.data;
  });
  return DATA;
}
export async function getStudentById(id) {
  const DATA = await Axios.post('getstubyid', id).then((res) => {
    if (res.status === 200) {
      return res.data.data;
    }
    return res.data.data;
  });
  return DATA;
}
export async function updateProfile(data) {
  const DATA = await Axios.post('updateprofile', data).then((res) => {
    if (res.status === 200) {
      cogoToast.warn('Profile updated successfully', { position: 'top-right' });
      return res.data.data;
    }
    return res.data.data;
  });
  return DATA;
}

export async function searchClassApi(data) {
  const DATA = await Axios.post('searchclass', data).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
    return res.data;
  });
  return DATA;
}

//  ======================  chats api

export async function getUsers(data) {
  const DATA = await Axios.post('getusers', data).then((res) => {
    if (res.status === 200) {
      return res.data.data;
    }
    return res.data.data;
  });
  return DATA;
}

export async function getMessageApi(data) {
  const DATA = await Axios.post('getmessage', data).then((res) => {
    if (res.status === 200) {
      return res.data.data;
    }
    return res.data.data;
  });
  return DATA;
}

export async function readMsgApi(data) {
  const DATA = await Axios.post('readmesage', data).then((res) => {
    if (res.status === 200) {
      return res.data.data;
    }
    return res.data.data;
  });
  return DATA;
}

export async function membershipUpgradeApi(data) {
  const DATA = await Axios.post('membershipUpgrade', data).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
    return res.data;
  });
  return DATA;
}

export async function joinMemApi(data) {
  const DATA = await Axios.post('joinmem', data).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
    return res.data;
  });
  return DATA;
}

export async function requestContact(data) {
  const DATA = await Axios.post('contact', data).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
    return res.data;
  });
  return DATA;
}

export async function playedGame(data) {
  const DATA = await Axios.post('playedgame', data).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
    return res.data;
  });
  return DATA;
}
