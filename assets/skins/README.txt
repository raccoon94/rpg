=== 영웅 코스튬 이미지 슬롯 ===

이 폴더에 아래 파일명으로 일러스트 PNG를 넣으면,
게임 속 이모지(placeholder) 대신 그 그림이 자동으로 표시됩니다.
(파일이 없으면 이모지로 보여요. 그래서 지금 당장은 비어 있어도 게임이 정상 작동합니다.)

필요한 파일명 (정확히 이 이름으로):
  default.png   - 기본 복장
  knight.png    - 흑기사
  swim.png      - 수영복
  angel.png     - 천사
  devil.png     - 데빌

권장 규격:
  - 정사각형 PNG (예: 512x512), 배경 투명(透明)
  - 캐릭터가 가운데 오도록
  - 너무 크지 않게 (한 장당 200KB 이하 권장)

일러스트 구하는 방법:
  - 그림 AI: NovelAI, Stable Diffusion(애니 모델), 미드저니 등
  - 외주 작가에게 의뢰
  ※ 성인 캐릭터 기준의 건전한 수위로 준비하세요.

새 코스튬을 추가하고 싶으면 index.html 안의 SKINS 목록에
{ id, name, emoji, img, price, aura, bonus, fx, fxEmoji, desc } 한 줄을 추가하고
여기에 같은 id의 png를 넣으면 됩니다.
