# DevConnector
##### A social network by developers, for developers

Fully fledged social networking site aimed for developers looking to make connections.

Currently under development.
Code adapted on the go based on Brad Traversy's MERN Stack Front To Back course on Udemy.

There were many errors present or bad practices, so I'm trying to fix all that while I advance on the course.

# Changes made
- Routes
  - I'll be changing all frontend routes so they are according to best practices (/route/action)
  - Many backend routes had their paths changed
  - Many backend routes added for administrative purposes
- Used TypeScript in React
  - Bear in mind that this may not be the best implementation as I still need to read the full documentation on how to use TS with React (lots of `any`)
- Fixed Redux reducers not being pure
  - There were some reducers that were not pure and didn't follow Redux Rules, so I updated them
- Using Redux hooks instead of mapping states and using connect
  - Hooks are the future, Brad should've updated the course already to meet the current expectations
- Many other things I changed while I was going that I can't remember right now, differences can be compared using a GitComparer if you will

# TODO:
- Add full profile system
  - Create page to view profile
  - Create page to manage education
  - Crate page to manage experiences
  - Add admin features
- Add user search and user list
- Add post system
  - Add skeleton
  - Add liking system
  - Add comment system
  - Add admin features
  
  As I advance in the MERN stack and acquire more experience, I'll be updating this.
