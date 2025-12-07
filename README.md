# Code Editor Pro - Internship Assignment

A modern Next.js-based code editor that allows users to write JavaScript code, run it, automatically fix common mistakes, and get help through an interactive help panel.

## 🎯 Features

1. **Code Editor**: Write and edit JavaScript code with a professional interface
2. **Run Code**: Execute your code and see the output in real-time console
3. **Auto-Fix**: Automatically fix common coding mistakes with one click
4. **Help System**: Get instant help with keyword-based intelligent assistance

## 🔧 Auto-Fix Rules

The Auto-Fix feature applies the following rules:

1. **Add Missing Semicolons**: Automatically adds semicolons at the end of statements
2. **Fix Indentation**: Properly indents code with 2 spaces per level
3. **Remove Extra Spaces**: Removes unnecessary multiple spaces
4. **Fix Bracket Spacing**: Ensures proper spacing before opening braces
5. **Fix Parentheses Spacing**: Removes extra spaces inside parentheses

## 💡 Help Keywords

The help system intelligently responds to questions about:

- **semicolon** - Learn about semicolon usage
- **function** - Understand how to create and use functions
- **variable** - Learn about variable declaration (let, const)
- **console** - Understand console.log usage
- **error** - Get help with common errors
- **loop** - Learn about loops (for, while)
- **if** - Understand conditional statements
- **array** - Learn about arrays and array methods
- **object** - Understand objects and properties
- **string** - Learn about string manipulation
- **run** - How to run your code
- **fix** - How to use the auto-fix feature
- **indent** - Learn about proper indentation

## 🚀 Installation & Running

1. **Clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/coding-assistant.git
cd coding-assistant
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run the development server:**
```bash
npm run dev
```

4. **Open your browser:**
Visit [http://localhost:3000](http://localhost:3000)

## 📋 Usage Guide

### Writing Code
Type your JavaScript code in the editor area. The editor supports:
- Syntax highlighting
- Multi-line editing
- Tab support

### Running Code
1. Click the **"Run Code"** button (green button with ▶ icon)
2. View output in the console section below
3. Errors will be displayed in red with descriptive messages

### Auto-Fixing Code
1. Write your code (even with mistakes)
2. Click the **"Auto-Fix"** button (blue button with 🔧 icon)
3. Watch as your code gets automatically formatted and fixed

### Getting Help
1. Click the **"Help"** button (purple button with ❓ icon)
2. Type your question in the input field
3. Press Enter or click "Ask"
4. Get instant help based on keywords in your question

## 🛠️ Technology Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library with latest features
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v4** - Modern utility-first CSS framework
- **Monaco Editor** - Professional code editor component

## 📁 Project Structure
```
coding-assistant/
├── src/
│   └── app/
│       ├── page.tsx          # Main application component
│       ├── layout.tsx         # Root layout
│       └── globals.css        # Global styles
├── public/                    # Static assets
├── README.md                  # This file
├── package.json              # Dependencies
└── tsconfig.json             # TypeScript config
```

## 🎨 UI Features

- **Gradient Backgrounds** with animated effects
- **Glass-morphism** design elements
- **Smooth Animations** on all interactions
- **Professional Color Scheme** (Purple, Blue, Pink gradients)
- **macOS-style Window** with traffic light dots
- **Loading States** on buttons during operations
- **Custom Scrollbars** for better aesthetics
- **Responsive Design** that works on all screen sizes

## 🧪 Testing Examples

### Test Auto-Fix
```javascript
function test(x,y){
console.log("test")
let a=5
if(x>0){
return x+y
}
}
```

### Test Run Code
```javascript
console.log("Hello World");
let x = 10;
let y = 20;
console.log("Sum:", x + y);
```

### Test Help System
Try asking:
- "How do I use functions?"
- "What is a semicolon?"
- "Help with arrays"

## 👨‍💻 Author

**[Your Full Name]**
- Email: vanshitapandey31017@gmail.com
- GitHub: [@Vanshitaaa20](https://github.com/Vanshitaaa20)

## 📝 Assignment Submission

This project was created as part of an internship assignment for CodingJr.

**Assignment Requirements:**
- ✅ Code Editor with Run functionality
- ✅ Auto-Fix feature with multiple rules
- ✅ Help system with keyword matching
- ✅ Clean state management
- ✅ Modern UI with Tailwind CSS
- ✅ Complete documentation

## 🔮 Future Enhancements

- [ ] Add more auto-fix rules (camelCase conversion, etc.)
- [ ] Expand help database with more topics
- [ ] Add code saving/loading functionality
- [ ] Support for multiple programming languages
- [ ] Advanced syntax highlighting
- [ ] Code sharing via URL
- [ ] Dark/Light theme toggle
- [ ] Code execution history

## 📄 License

This project was created for educational purposes as part of an internship assignment.

---

Made with ❤️ for CodingJr Internship
