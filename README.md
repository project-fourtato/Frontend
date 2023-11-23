# BOOKER
나만의 작은 서재, Booker


## [BOOKER 바로가기](https://10.50.242.254:8080)

## 1. 프로젝트 소개 🗒

![img](https://github.com/project-fourtato/Backend_v3/assets/84323684/d9742683-311a-4f06-88ef-f394af492f70)

**_Booker와 함께 나만의 서재를 통해 독서 생활을 기록하고, 타인과 독서 취향 및 경험을 공유해 보세요._**


## 2. 프로젝트 기간
- 스터디 : _2023-07-18 ~ 2023-09-30_
- 개발 : _2023-07-27 ~ 2022-11-23_

## 3. 팀원 소개  
-   FE - 김정현   
-   BE - 심예은 :  메인 / 팔로우 / 프로필 / 쪽지
-   BE - 장다연 :  책 추천 / 책 거래 / 검색 / 로그인 / 버그 및 유저 신고    
-   BE - 최지민 :  서재 / 책 검색 / 독서록

## 3. 프로젝트 시연영상 📌
[https://www.youtube.com/watch?v=Lj7Wr-x3Y0](https://youtu.be/1n506S7Sv2E?si=jpLs5GTl-S3bkk4_)

## 4. 기술 스택 🛠
![img](https://github.com/project-fourtato/Backend_v3/assets/84323684/76d8421b-c17e-4f82-9018-1a97560aea6d)

## 5. WORKFLOW 🫧
https://capable-oboe-cce.notion.site/WORKFLOW-3a1e6afa67ea496584673b33ad937ef6?pvs=4

## 6. API 명세서 📃

https://capable-oboe-cce.notion.site/API-d0eb912b8e5b4c42b01dc3b36499b4aa?pvs=4

## 7. ERD 🗂

https://capable-oboe-cce.notion.site/DATA-MODELING-4d2dddaaee6c409ca7c08335a89909aa?pvs=4

## 8. UI

https://capable-oboe-cce.notion.site/UI-51f2bd25ef814651b13dfead020686ae?pvs=4

## 9. 트러블 슈팅 🎃
### BACK

      
**연관관계를 고려한 DB 및 엔티티 구현**

-   연관관계를 고려하여 DB와 엔티티를 설계하는 과정에서 잘못된 매핑으로 인해 많은 시간을 할애함
   1.  Many to Many 구조를 싱글테이블을 만들어 해결함
   2.
      - 외래키를 잘못잡아서 books 테이블의 profile_uid 칼럼처럼 hibernate가 자동으로 새로 만드는 문제 발생함
      - 이 때의 칼럼은 null값이 들어가고 쓸모 없었기에 임의로 제거했는데 hibernate가 인식을 못하는 문제가 발생함
      - 그래서 어쩔 수 없이 자동으로 생성된 칼럼을 넣되 쓰지 않도록 하였음
  3.
     - 엔티티 변수는 원래대로 ‘uid’로 바꾼 다음 annotation으로 messageid등으로 테이블명 같은 값 다른 이름으로 칼럼명 지정( DB명까지 바꾸지 않는 이유 : 각 table의 칼럼명이 겹치면 오류 발생함 ) → 외래키가 연결된 주키를 못 찾는 문제 해결함
     - 외래키는 직접 입력이 아니라 hibernate에 의해 자동 주입되도록 변경함
  4.
     - 생성해준 외래키 컬럼에 null 값이 들어가는 문제 발생함
    - DB를 수정해야하는 것이 아닌, 연관관계 편의 메소드를 추가하여 null값만 들어가는 문제 해결함

**github 강제push 문제**

-   커밋명 깨짐 문제로 모두의 동의 하에 강제 push하도록 결정하여 push한 결과 모든 파일과 커밋이 삭제되는 문제 발생함
-   다른 팀원이 미리 가장 최근의 commit을 가져온 상태라 새로운 repository를 만들어 기존의 커밋과 파일을 github에 살려냄

**nginx 서버**
-  라즈베리파이를 통해 nginx 설치를 완료하고 mariaDB까지 설치를 완료했으나 spring 코드는 실행되지만 react 코드가 실행되지 않는 문제 발생함
-  spring 코드 안에 react 코드를 빌드해서 넣고 전체적으로 한 번 더 빌드하여 jar 파일이 실행될 때 react 코드를 자동으로 실행되고 spring 코드가 실행되도록 하여 문제 해결함
  
**회원탈퇴 시 세션 반납 및 Main으로 이동하는 로직 구현**

-   Main 페이지를 한 코드로 제작하고 세션 값 여부에 따라 보이는 화면을 달리하도록 react 코드로 프론트 환경을 구축했었음
-   문제는 회원 탈퇴 시 탈퇴 모달창을 닫고 세션을 반납하고 Main으로 이동해야 하는데, 바로 Main으로 이동할 경우 세션값이 null로 받아와 로그인하지 않았을 경우의 Main화면이 뜨지 않음
-   원래는 탈퇴 모달창 관련 코드가 작성된 곳에서 세션을 관리하였다면, 회원탈퇴 버튼을 눌렀을 경우 Main 페이지로 이동하여 세션을 반납하고 재렌더링되도록 구현하여 이 문제를 해결함

### FRONT

      
**Recoil을 통한 로그인 상태 유지**

-   세션 값을 통해 세션 값이 있을 경우 recoil의 변수 값에 true을 주어 로그인된 환경이 유지되도록 구현함

**말풍선 만들기**
- 말풍선 꼬리부분과 몸통을 따로 만들어 코드를 통해 사용자가 위화감이 들지 않도록 구현함
