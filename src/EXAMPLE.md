# Phaser 프로젝트 구조 설계 가이드

> **목표**: Scene 비대화 방지, 테스트 가능성 향상, 재사용 가능한 구조

---

## 📁 game/

**게임 전체 설정 & 생명주기 관리**

* `game.ts`

  * `Phaser.Game` 생성
  * 게임 진입점 (entry point)

* `config.ts`

  * 해상도
  * FPS
  * 물리 옵션

* `constants.ts`

  * 전역 상수 정의

---

## 📁 scenes/

**Phaser Scene 단위 (화면과 흐름 담당)**

* `BootScene`

  * 초기 설정

* `PreloadScene`

  * 리소스 로딩

* `MenuScene`

  * 시작 화면

* `PlayScene`

  * 실제 게임 플레이 흐름

> ⚠️ **규칙**
>
> * 씬은 로직 최소화
> * 시스템 호출 위주

---

## 📁 entities/

**게임 오브젝트 단위**

* `Player`
* `Enemy`
* `Bullet`

**책임**

* 이동
* 애니메이션
* 상태 관리

> ❌ 씬에서 직접 구현
> ⭕ 엔티티로 분리

---

## 📁 systems/

**게임 규칙 / 로직 처리 계층**

* 입력 처리
* 충돌 처리
* 점수 계산
* AI 로직

**특징**

* 여러 씬에서 재사용 가능
* 테스트 용이
* `vitest`와 최고 궁합

---

## 📁 ui/

**게임 UI 전용 영역**

* HUD
* 메뉴
* 버튼
* 팝업

> 🎯 핵심
>
> * 실제 게임 로직과 완전 분리

---

## 📁 events/

**이벤트 기반 통신 (mitt 사용)**

```ts
import mitt from 'mitt'

export const EventBus = mitt()
```

**역할**

* Scene ↔ System ↔ UI 연결
* 의존성 제거

---

## 📁 utils/

**순수 함수 모음**

* 수학
* 랜덤
* 시간
* 포맷팅

**규칙**

* Phaser 의존 ❌
* 테스트 100% 가능

---

## 📁 types/

**전역 타입 선언**

* Phaser 확장 타입
* 전역 인터페이스

---

## 🧠 설계 철학 요약

| 영역     | 책임      |
| ------ | ------- |
| Scene  | 화면 + 흐름 |
| Entity | 개체 행동   |
| System | 규칙      |
| UI     | 표시      |
| Event  | 연결      |
| Utils  | 계산      |

---

✅ **결과**

* 유지보수 쉬움
* 테스트 가능
* 씬 비대화 방지
* 확장에 강한 구조
