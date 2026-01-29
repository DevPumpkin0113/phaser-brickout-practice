# [phaser-brickout-practice]

## 📋 프로젝트 소개

[게임에 대한 간단한 설명 작성]

## 🌐 배포 (GitHub Pages)

이 프로젝트는 GitHub Actions을 통해 자동으로 GitHub Pages에 배포됩니다.

🔗 **플레이하기** : **[phaser-brickout-practice](https://devpumpkin0113.github.io/phaser-brickout-practice/)**

## 🛠️ 기술 스택

### 코어
- **Phaser** - 게임 엔진
- **TypeScript** - 타입 안전성
- **Vite** - 빌드 도구

### 라이브러리
- **Howler** - 오디오 관리
- **Mitt** - 이벤트 버스
- **Lodash** - 유틸리티

### 개발 도구
- **Vitest** - 테스팅 프레임워크
- **ESLint** - 코드 린팅
- **Prettier** - 코드 포맷팅
- **Claude Code** - AI 페어 프로그래밍

## 📁 프로젝트 구조

```
phaser-brickout-practice/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Pages 자동 배포 설정
├── node_modules/           # 의존성 패키지
├── public/                 # 정적 파일
├── scripts/
│   └── create-repo.sh      # 레포지토리 생성 스크립트
├── src/                    # 소스 코드
│   ├── entities/           # 게임 엔티티/오브젝트
│   ├── events/             # 이벤트 시스템
│   ├── game/               # 게임 코어 로직
│   ├── scenes/             # Phaser 씬
│   ├── systems/            # 게임 시스템
│   ├── types/              # TypeScript 타입 정의
│   ├── ui/                 # UI 컴포넌트
│   ├── utils/              # 유틸리티 함수
│   └── main.ts             # 애플리케이션 진입점
├── .gitignore
├── index.html              # 메인 HTML
├── package-lock.json
├── package.json
├── README.md               # 프로젝트 문서
└── vite.config.js          # Vite 설정
```

## 📝 개발 가이드

### 코드 스타일

- ESLint와 Prettier 설정을 따릅니다
- `npm run lint`
- `npm run format`

### 브랜치 전략

```
main          ← 배포 브랜치 (GitHub Actions 자동 배포)
  ↑
develop       ← 개발 브랜치
  ↑
feature/*     ← 기능 개발 브랜치
```

### 커밋 컨벤션

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅, 세미콜론 누락 등
refactor: 코드 리팩토링
test: 테스트 코드 추가
chore: 빌드 업무, 패키지 매니저 수정 등
```

## 👤 개발자

[![GitHub](https://img.shields.io/badge/@devpumpkin0113-GitHub-black?logo=github)](https://github.com/devpumpkin0113)
