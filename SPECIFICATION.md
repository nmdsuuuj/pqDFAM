DFAM Pro-Matrix Web - 要件定義書 / 詳細仕様書 (v1.0)
1. プロジェクト概要
名称: DFAM Pro-Matrix Web
目的: Moog DFAMのサウンドとワークフローをWeb上で完全再現し、デジタルならではの機能（A/Bポリリズム、マトリクスパッチベイ、詳細リズム編集、グルーブエンジン）で拡張した、プロ仕様の音楽制作PWA（Progressive Web App）。
ターゲットデバイス: Androidスマートフォン（横画面・Landscapeモード推奨）。
2. 技術スタック & アーキテクチャ
* Runtime: Browser (Chrome for Android recommended)
* Framework: React 18+ (TypeScript)
* Build Tool: Vite
* Styling: Tailwind CSS (レスポンシブではなく、固定比率レイアウト重視)
* State Management: Zustand (Transient updates for audio performance)
* Audio Engine:
  * Tone.js + Web Audio API (Native AudioNodes)
  * AudioWorklet: カスタムクロック（Phasor Clock）の実装に使用。
* Persistence: IndexedDB (Dexie.js等を使用し、操作ごとの自動保存を実現)
* Icons: Lucide React
3. UI/UX ガイドライン
3.1 画面レイアウト共通
* オリエンテーション: Landscape（横画面）固定。
* スクロール: 完全禁止 (No Scroll)。 ビューポート 100vh / 100vw 内に全ての要素を収める。
* タブ構成: 画面下部または上部のナビゲーションで切り替え。
  * MAIN: シンセサイズ & シーケンス演奏
  * MATRIX: モジュレーション設定
  * METRO: リズム構造詳細編集
  * LIB: 保存・設定・管理
3.2 操作インタラクション
* Knob (ノブ):
  * SVG描画によるリアルな回転アニメーション。
  * 操作: タップして上下ドラッグで値を変更（Relative touch）。
  * Double Tap: デフォルト値にリセット。
  * Haptics: 値変更時やセンター通過時に端末バイブレーションを作動。
* Safety Guards:
  * ブラウザの「戻る」「リロード」に対する BeforeUnload 警告。
  * PWAインストール（ホーム画面に追加）を促すUI。
4. 詳細機能仕様 (タブ別)
【TAB 1: MAIN PERFORMANCE】
画面を左右 4:6 の比率で分割。
4.1 左側: Synth Engine (DFAM Replica)
* VCO Section:
  * VCO 1 Freq, Wave (Tri/Square blend)
  * VCO 2 Freq, Wave (Tri/Square blend)
  * Noise Level (White Noise / External)
* Filter/Mix Section:
  * VCF Cutoff, Resonance
  * VCF Mod Amount (Selectable source usually EG/Noise)
* Envelope Section:
  * VCA Decay
  * VCF Decay
  * VCO Decay
* Utility (Context Menu):
  * 各セクション脇に R (Random), C (Clear) ボタン（シンセパラメータのみ対象）。
4.2 右側: Dual Sequencer & Modifiers
* Pattern A/B Control:
  * A/B 切替スイッチ: 編集対象のパターンを選択（表示色変化：A=Orange, B=Blue）。
  * Cycle Knobs: Cycle A (1-8), Cycle B (1-8)。再生回数を指定。
* Step Knobs (8 Steps x 2 Rows):
  * Row 1: Pitch (Frequency CV)
  * Row 2: Velocity (VCA/VCF Amount)
  * LED: 現在再生中のステップが発光。
* Sequence Modifiers (4 Knobs):
  * Groove Type: (Swing, Dilla, Rush, Lag, Humanize)
  * Groove Depth: (0% - 100% - Overdrive)
  * Step Swap: 再生順序変更 (Fwd, Rev, Pendulum, Odd/Even, Random, Brownian)
  * Step Breaker: 16種類の「Metroパターン（リズム構造）」を切り替え。
【TAB 2: MATRIX (MODULATION)】
2.1 Matrix Grid (Digital Pin Style)
* サイズ: 縦(Source) 10-12 x 横(Dest) 8-10 程度（画面に収まる範囲）。
* Sources (縦軸):
  * Seq Pitch A, Seq Vel A, Seq Pitch B, Seq Vel B
  * VCA EG, VCF EG, VCO EG
  * LFO (Tri), LFO (Square)
  * Noise, Random Voltage, Constant
* Destinations (横軸):
  * VCO 1/2 Freq, VCO 1/2 Wave, FM Amount
  * VCF Cutoff, VCF Res
  * VCA Decay, VCF Decay
  * LFO Rate (重要: Chaotic LFO用)
* 操作: グリッドの交差点をタップ → アクティブ化。
2.2 Amount Controller
* アクティブなセルを選択中、画面下部に「双方向スライダー (-100% to +100%)」を表示して変調量を設定。
* Disconnect ボタンで結線を解除。
2.3 Matrix Randomizer
* Density Knob: 結線の密度（10%〜100%）を指定。
* Allow Feedback Toggle: ONにするとループ結線（DelayNode経由で発振）を許可。
* Chaos Button: 設定に基づき完全ランダム結線。
【TAB 3: METRO (RHYTHM EDITOR)】
Intellijel Metropolixスタイルの詳細シーケンス編集。
3.1 Subdiv Palette Setup
* 8 Slots: よく使う連符設定を登録。
* Values: x1, x2, x4, x3(Triplet), x1.5(Dotted), x2.5(Quintuplet feel), /2(Half speed) など。
3.2 Breaker Pattern Selector
* 1〜16のメモリスロットを選択（MainタブのStep Breakerノブと連動）。
3.3 Step Edit Matrix (8 Steps x 3 Rows)
* Row 1: PULSE (Length)
  * 各ステップのクロック滞在数 (1-8)。
  * ランダムボタン装備（重み付けあり：短い音符が出やすい）。
* Row 2: GATE TYPE
  * Trig (Retrigger), Hold (Legato/Tie), Rest (Mute)。
  * ランダムボタン装備（重み付けあり：Trig優先）。
* Row 3: SUBDIV (Speed)
  * Palette Slot 1-8 から選択。
  * ランダムボタン装備（Palette内から選択）。
* Global Random: 上記3要素を一括ランダム化。
【TAB 4: LIB (SYSTEM & LIBRARY)】
4.1 Project Management
* Save / Save As: IndexedDBへの保存。
* Export JSON: 全ステート（Synth, Seq, Matrix, Metro, Settings）を1ファイルに出力。
* Import JSON: ファイル読み込みと復元。
4.2 Preset Grid
* 8 Banks x 8 Patterns: グリッド表示。タップでロード、長押しで上書き保存。
* ステータス表示（Empty / Saved / Modified）。
4.3 System Settings
* Audio Latency: Mode切替 (Interactive / Playback)。
* MIDI Setup: USB MIDI / Bluetooth MIDI入力設定（Clock受信、Note受信）。
* PWA Install: インストールボタン。
5. データ構造 (JSON Schema)
interface DFAMProject {
 version: string; // "1.0.0"
 meta: {
   title: string;
   bpm: number;
   scale: string; // Chromatic, Pentatonic, etc.
 };
 synth: {
   // 全ノブの値 (0.0 - 1.0)
   vco1_freq: number;
   vcf_cutoff: number;
   // ...その他全て
 };
 sequencer: {
   patternA: { pitch: number[]; velocity: number[] }; // 8 steps
   patternB: { pitch: number[]; velocity: number[] };
   cycleA: number; // 1-8
   cycleB: number;
   modifiers: {
     grooveType: string;
     grooveDepth: number;
     stepSwap: number; // Mode index
     breakerIdx: number; // 0-15
   };
 };
 matrix: {
   connections: Array<{
     src: string;
     dst: string;
     amount: number; //-1.0 to 1.0
   }>;
 };
 metro: {
   subdivPalette: number[]; // e.g., [1, 2, 0.5, 3, 2.5, ...]
   patterns: Array<{ // 16 patterns
     pulses: number[]; // 8 steps
     gates:  ('trig' | 'hold' | 'rest')[];
     subdivs: number[]; // Palette Index
   }>;
 };
}

6. オーディオエンジン仕様 (Advanced)
6.1 Custom Phasor Clock (AudioWorklet)
* Tone.jsの標準Transportは使用せず、独自の Phasor (位相信号 0.0 -> 1.0) ベースのクロックシステムを構築する。
* 機能:
  * Groove Distortion: Phasorの上昇カーブを非線形に歪ませることで、LFOやエンベロープを含むシステム全体にGroove（Swing/Lag/Rush）を適用する。
  * Subdiv Calculation: ステップごとの Pulse と Subdiv 設定に基づき、Phasorの進行速度をローカルで伸縮させる（ラチェット/連符の実現）。
6.2 Matrix Routing Logic
* Web Audio APIの GainNode を使用してルーティングを行う。
* 最適化: amount === 0 の接続は disconnect() し、CPU負荷を低減する。
* Feedback Guard: Allow Feedback がOFFの場合は、閉路（Loop）検出時に接続を拒否するか、DelayNodeを自動挿入してブラウザクラッシュを防ぐ。
6.3 Signal Flow
[Phasor Clock] ---> [Sequencer Logic] ---> [Envelopes/Gates]
                                    |
[VCO 1/2] --> [VCF] --> [VCA] --> [Out]
   ^           ^         ^
   |           |         |
[Matrix Summing Nodes (controlled by Matrix Grid)]

7. 開発フェーズ定義
* Phase 1: UI Skeleton & Navigation
  * 全タブのHTML/CSS実装。
  * レスポンシブ（固定比率）動作の確認。
  * ノブコンポーネントの操作感チューニング。
* Phase 2: Core Audio Engine
  * Tone.jsでのシンセ音源実装。
  * Phasor Clockによる基本シーケンス再生。
* Phase 3: Logic Implementation
  * A/B Cycle Logic。
  * Metro (Pulse/Gate/Subdiv) Logic。
  * Matrix Routing Logic。
* Phase 4: Persistence & Polish
  * IndexedDB連携。
  * JSON Export/Import。
  * PWA化設定。
    
8. Future Roadmap (Dual Unit Plan)
* **Dual DFAM System:**
    * 将来的に、このアプリ内に2台のDFAMユニット（Unit A / Unit B）を搭載し、相互変調（Cross Modulation）やステレオ運用を可能にする予定。
    * **Architecture Requirement:**
        * 現在の開発（Phase 1-4）においても、シンセエンジンやシーケンサーのコードは「1つのインスタンス」として完結させず、将来的に `new DFAMUnit()` のように複数生成できる**クラス設計（または再利用可能なフック設計）**を採用すること。
        * Global State（BPMなど）と Local State（各ユニットのノブ）を明確に分離して実装すること。
