---
name: create-unit-test
description: Unit Test を作成時に使用をする．serviceやvalidation helper function のテストを作る際に使用する
---

# 本文

最初に以下を報告してください:

1. 現在の実装でテスト作成が可能か
2. テストがしにくい理由があれば具体的に（依存関係、DI不足、外部I/Oなど）

テスト作成の条件:

- テストは対象フォルダと同階層に置く（Co-location）
- AAAパターン（Arrange/Act/Assert）を明示
- repository 呼び出しは mock する
- 正常系・異常系・エッジケースを含める
- ケース名（it/describe）は日本語
- テスト妥当性を考慮（対象の想定振る舞いに合うケースにする）

出力:

- テストファイルを実装
- 変更内容の簡潔な説明
- 追加の注意点があれば短く
