## Linkbrary - 코드잇 스프린트 FE 9기
### 배포 사이트 : https://linkbrary-9-99.vercel.app/

### 프로젝트 소개

<img width="600" alt="contents-01" src="https://github.com/user-attachments/assets/135348d0-ed9d-492e-a9a4-6216bddca0d1">


> 자신만의 링크를 저장하고 공유하는 서비스 제공

> 작업 기간 : 2024.11.06 (수) - 2024.11.19 (화)


## 팀원 소개

|            | <img src="https://github.com/user-attachments/assets/5c4fd2d8-ce67-4f0a-9ce8-d6a928a4752d" alt="박문균" width="150" height="200"/> <br> **박문균 (👑 PM)** | <img src="https://avatars.githubusercontent.com/u/174448906?v=4" alt="전상민" width="150" height="200" /> <br> **전상민** | <img src="https://github.com/user-attachments/assets/c507e53d-ac12-4c2c-83f2-4ab4bc018f56" alt="구민지" width="150" height="200"/> <br> **구민지** | <img src="https://github.com/user-attachments/assets/acffe020-b376-4493-97cc-cadfc74d0eef" alt="정준영" width="150" height="200"/> <br> **정준영** | <img src="https://github.com/user-attachments/assets/fe813d8b-9ba2-4480-a4cc-7d48fc239db7" alt="홍예림" width="150" height="200" /> <br> **홍예림** |
|------------|----------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| 역할       | 팀장으로 프로젝트 참여<br>로그인 / 회원가입 기능<br>간편 로그인 / 회원가입                         | 랜딩 페이지 구현<br>유저 정보 관리<br>소셜 공유                                 | 즐겨찾기 페이지<br>즐겨찾기 기능<br>링크 수정 / 삭제 기능                        | -                                                                               | 폴더 / 링크 관리 모달 구현<br>자유롭게 소개                                        |
| 이메일     | mungyun1234@naver.com                                                                              | venise5224@gmail.com                                                           | rnalswl96@naver.com                                                            | wn8624@naver.com                                                               | hongggy@gmail.com                                                                |
| GitHub     | [mungyun](https://github.com/mungyun/)                                                              | [venise5224](https://github.com/venise5224)                                        | [99minji](https://github.com/99minji/99minji.git)                               | [junjeeong](https://github.com/junjeeong)                                          | [hongggyelim](https://github.com/hongggyelim)                                         |

## 🚀 시작하기

For building and running the application you need:

- Node.js (Version 16 or later recommended)
- npm (Included with Node.js) or yarn for dependency management.

#### Installation

```
git clone <https://github.com/codeit9-temporary/linkbrary.git>
cd linkbrary
```

#### Running the Development Server

```
npm install
npm run dev
```

## 기술 스택

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=black)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)

Zustand

react-hot-toast
react-icons
react-spinners


## 유저 플로우

![LinkBrary_UserFlow2](https://github.com/user-attachments/assets/1d2dfd32-c839-423e-9ba2-78277f380997)

## 주요 기능

📝 저장하고 싶은 링크를 추가하고 폴더로 관리하세요

💌 나의 링크가 저장된 폴더를 친구에게 공유하세요

🌟 즐겨찾는 링크를 모아보세요

📱 반응형 웹디자인 

👥 간편 로그인

### ✅메인 랜딩 페이지(“/”)

 ‘로그인' 버튼을 클릭하면 /login 페이지로 이동합니다.

'링크 추가하기' 버튼을 클릭하면

로그인이 되어있는 경우 /link 페이지로 이동합니다.

로그인이 되지 않은 경우 /login 페이지로 이동합니다.

### ✅로그인 (“/login” ) & 회원가입 페이지(“/signup” )

로그인 성공 시 토스트 창을 보여주고 “/” 페이지로 이동합니다.

회원가입 성공 시 토스트 창을 보여주고 /login 페이지로 이동합니다.

구글, 카카오 간편 로그인 & 회원가입이 가능합니다.

### ✅링크 페이지(“/links”)

'로고 버튼'을 클릭하면 / 페이지로 이동합니다.

'폴더 추가' 버튼을 통해 폴더 추가가 가능합니다.

추가된 폴더에서 폴더 수정/삭제가 가능합니다.

유효한 링크를 입력하고 '추가하기' 버튼을 누르면 링크가 추가됩니다. 

추가된 링크 카드는 해당 url에서 title  / discription / imageSource createdAt 를 불러옵니다.

링크 검색바에 검색어를 입력하면 전체 링크중 “url”, “title”, “description” 중 하나에 검색어가 포함된 링크들만 필터된 상태로 보입니다.

케밥 버튼을 통해 링크 수정/삭제가 가능합니다.

링크 카드의 별 버튼을 누르면 해당 링크는 즐겨찾기에 추가가 됩니다.

### **✅ 즐겨찾기(“/favorite”)**

즐겨찾기 된 링크만 보여줍니다.

## 노션 링크
[Notion 구경 가기👀](https://nickel-vegetarian-de0.notion.site/Linkbrary-135f52d774a880c8ba19f7c043a4b1c0?pvs=74)

## 브랜치 전략
#### 📌Git Flow

1. **main 브랜치**
    - 항상 배포 가능한 상태를 유지하는 브랜치로, 프로덕션에 직접 반영되는 코드가 포함됩니다.
2. **develop 브랜치**
    - 개발 중인 코드가 모이는 브랜치로, 모든 새로운 기능과 수정 사항이 병합되기 전에 여기서 통합 테스트가 이루어집니다.
3. **feature 브랜치**
    - 각 기능(또는 이슈)을 개발하기 위해 만들어지는 브랜치로, 일반적으로 `feature/이슈명` 형태로 생성됩니다.
    - 작업 완료 후 **develop 브랜치**에 병합됩니다.
4. **hotfix 브랜치**
    - 프로덕션(main 브랜치)에서 발견된 긴급한 버그를 수정하기 위해 사용하는 브랜치입니다.
    - 수정 후 main과 develop 브랜치에 병합됩니다.

## **📝 시연 영상**

