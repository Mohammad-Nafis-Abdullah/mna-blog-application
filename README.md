
# Advanced Blog Application

An advance blog app where an user can read blogs and post new blogs and delete posted blogs.

## Admin Account

**Email :** admin@admin.com

**Password :** admin@admin.com,


## Run Locally

Clone the project

```bash
  git clone https://github.com/Mohammad-Nafis-Abdullah/imt-job-task.git
```

Go to the project directory

```bash
  cd imt-job-task
```

Install dependencies

```bash
  yarn
  npm install
```

Start the application

```bash
  yarn dev
  npm run dev
```

After starting the application, the result is will be shown at [http://localhost:3000](http://localhost:3000).
## Features

- A list of Blogs is displayed in the Index page as a **Blog Card**.
- At the bottom of all Card displaying section a **Pagination** component is attached to control a certain amount of showing Blogs at a time.
- Search blog by Blog title in the **Search Bar**.
- Find the blogs that are posted by the logged in user by checking in the **My Blogs** checkbox. 
- Create new Blogs by logged in users to click **Create a New Blog**.
- Blogs can be *updated* and *deleted* by the user who post it to click the **Edit** button on Blog card in home page.
- Reader can read a blog in details by clicking on the blog card in index page that navigate to a individual **Blog details** page.
- In **Blog Details** page a reader can comment on the Blog after account login.
- If a reader comment second time in a blog, then the previous comment will be replaced by the new comment.