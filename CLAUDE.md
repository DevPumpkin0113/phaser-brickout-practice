# CLAUDE.md - Brick Breaker Development Guide

> Claude Code가 이 프로젝트에서 개발할 때 참고하는 문서

---

## Project Overview

- **프로젝트**: Brick Breaker (벽돌깨기)
- **엔진**: Phaser 3
- **언어**: TypeScript
- **빌드**: Vite
- **배포**: GitHub Pages

---

## Key Documents

- [docs/gdd.md](docs/gdd.md) - 게임 디자인 문서 (요구사항)
- [docs/roadmap.md](docs/roadmap.md) - 개발 로드맵 (진행 상황)
- [src/EXAMPLE.md](src/EXAMPLE.md) - 폴더 구조 가이드

---

## Project Structure

```
src/
├── game/           # 게임 설정 & 진입점
│   ├── game.ts     # Phaser.Game 생성
│   ├── config.ts   # 게임 설정 (해상도, 물리 등)
│   └── constants.ts # 전역 상수
│
├── scenes/         # Phaser Scene (화면 흐름)
│   ├── BootScene.ts
│   ├── PreloadScene.ts
│   ├── MenuScene.ts
│   └── PlayScene.ts
│
├── entities/       # 게임 오브젝트
│   ├── Paddle.ts
│   ├── Ball.ts
│   └── Brick.ts
│
├── systems/        # 게임 로직
│   ├── InputSystem.ts
│   ├── CollisionSystem.ts
│   └── ScoreSystem.ts
│
├── ui/             # UI 컴포넌트
│   ├── HUD.ts
│   └── Button.ts
│
├── events/         # 이벤트 버스 (mitt)
│   └── EventBus.ts
│
├── utils/          # 순수 함수
│   └── math.ts
│
├── types/          # 타입 정의
│   └── index.ts
│
└── main.ts         # 앱 진입점
```

---

## Commands

```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 검사
npm run format   # Prettier 포맷팅
npm run test     # Vitest 테스트
```

---

## Development Workflow

### Branch Strategy

```
main          <- 배포 브랜치 (GitHub Actions 자동 배포)
  ^
develop       <- 개발 브랜치
  ^
feat/*        <- 기능 개발 브랜치 (예: feat/move_paddle)
fix/*         <- 버그 수정 브랜치
```

### Workflow (Claude Code)

```
(User: 브랜치 생성) -> Claude: 코드 작성 -> (User: 검토) -> 버그 수정 -> (User: 커밋 및 푸시)
```

**Claude의 역할**:
1. 코드 작성 전 브랜치 확인 - main/develop에서 직접 작업하지 않음
2. 코드 작성 - src/ 폴더 구조에 맞게 분리
3. 검토 - lint, build 실행
4. 버그 수정 - 발견된 이슈 해결

**User의 역할** (Claude가 대신하지 않음):
- 브랜치 생성/전환
- `npm run dev`로 테스트
- 커밋 및 푸시

### 개발 프로세스 상세

#### 1. 기능 개발 시작
- [docs/gdd.md](docs/gdd.md) 참조하여 요구사항 파악
- [docs/roadmap.md](docs/roadmap.md) 확인하여 현재 진행 상태 파악
- User가 브랜치 생성 후 Claude에게 알림

#### 2. 코드 작성
- `types/` - 필요한 타입 정의 먼저 작성
- `game/constants.ts` - 게임 상수 정의
- `entities/` - 게임 오브젝트 구현
- `systems/` - 게임 로직 구현
- `scenes/` - 씬에서 엔티티/시스템 연결
- `game/config.ts` - 씬 등록

#### 3. 검토
- `npm run lint` 실행
- `npm run build` 실행
- 에러 발생 시 즉시 수정

#### 4. 완료 보고
- 생성/수정된 파일 목록
- 구현된 기능 요약
- 검토 결과 (lint, build)

#### 5. User 테스트 후 피드백
- 버그 발견 시 수정
- 기능 조정 요청 시 반영
- GDD와 불일치 시 GDD 또는 코드 수정

#### 6. 완료
- [docs/roadmap.md](docs/roadmap.md) 업데이트
- User가 커밋 및 푸시

### Commit Convention

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 코드 추가
chore: 빌드/패키지 매니저 수정
```

---

## Code Style Guidelines

### Scene 규칙
- 로직 최소화, 시스템 호출 위주
- 무거운 로직은 systems/로 분리

### Entity 규칙
- 자신의 상태와 행동만 관리
- 다른 엔티티 직접 참조 지양

### System 규칙
- 순수 함수 지향
- 테스트 가능하게 작성

### Event 사용
- Scene <-> System <-> UI 간 통신은 EventBus 사용
- 직접 참조 대신 이벤트 발행/구독

---

## Game Elements Reference (from GDD)

### Paddle
- 좌우 이동만 가능
- 아이템으로 길이 변경

### Ball
- 일정 속도 이동, 충돌 시 반사
- 스테이지별 속도 증가

### Bricks
| 타입 | 설명 |
|------|------|
| 일반 벽돌 | 1회 충돌 시 파괴 |
| 강화 벽돌 | 2~3회 충돌 필요 |
| 무적 벽돌 | 파괴 불가, 반사만 |
| 아이템 벽돌 | 파괴 시 아이템 드롭 |

### Items
- 패들 확장/축소
- 공 속도 증가/감소
- 멀티볼

### Game States
- Boot / Preload
- Title
- Ready
- Playing
- Stage Clear
- Game Over
- Pause
