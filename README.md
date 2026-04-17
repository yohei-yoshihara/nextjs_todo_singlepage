# Single Page Todo App

![localhost_3000_tasks_page=1 query=3(iPhone SE)](https://github.com/user-attachments/assets/49469a21-0a7c-4338-8602-a9e7f0c566d2)

タスクの作成、編集、削除すべてを一覧ページのダイアログから行えるようにしたアプリ。
つまり、一覧ページから遷移することなく、すべての操作が行える。

## 起動

```bash
cd nextjs_todo_singlepage
pnpm install
pnpm dlx prisma generate
pnpm dlx prisma db push
pnpm dlx tsx seed.ts
pnpm run dev
```
