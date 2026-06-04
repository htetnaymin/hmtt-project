const challenges = [
  {
    id: 1,
    title: "Reverse a String",
    difficulty: "Easy",
    description: "Write a function `reverseString(str)` that takes a string as input and returns it reversed. For example, `reverseString(\"hello\")` should return `\"olleh\"`.",
    template: `function reverseString(str) {
  // Write your code here
  
}`,
    functionName: "reverseString",
    tests: [
      { input: ["hello"], expected: "olleh", label: 'reverseString("hello")' },
      { input: ["Coding"], expected: "gnidoC", label: 'reverseString("Coding")' },
      { input: ["a"], expected: "a", label: 'reverseString("a")' },
      { input: ["#123!"], expected: "!321#", label: 'reverseString("#123!")' }
    ]
  },
  {
    id: 2,
    title: "Find Maximum Number",
    difficulty: "Easy",
    description: "Write a function `findMax(arr)` that takes an array of numbers and returns the maximum number in that array. For example, `findMax([1, 5, 3])` should return `5`.",
    template: `function findMax(arr) {
  // Write your code here
  
}`,
    functionName: "findMax",
    tests: [
      { input: [[1, 5, 3, 9, 2]], expected: 9, label: "findMax([1, 5, 3, 9, 2])" },
      { input: [[-10, -5, -20, -15]], expected: -5, label: "findMax([-10, -5, -20, -15])" },
      { input: [[100]], expected: 100, label: "findMax([100])" }
    ]
  },
  {
    id: 3,
    title: "Palindrome Checker",
    difficulty: "Medium",
    description: "Write a function `isPalindrome(str)` that returns `true` if a given string is a palindrome (reads the same forwards and backwards) and `false` otherwise. Ignore casing, spaces, and punctuation.",
    template: `function isPalindrome(str) {
  // Write your code here
  
}`,
    functionName: "isPalindrome",
    tests: [
      { input: ["racecar"], expected: true, label: 'isPalindrome("racecar")' },
      { input: ["hello"], expected: false, label: 'isPalindrome("hello")' },
      { input: ["A man, a plan, a canal. Panama"], expected: true, label: 'isPalindrome("A man, a plan, a canal. Panama")' },
      { input: ["Was it a car or a cat I saw?"], expected: true, label: 'isPalindrome("Was it a car or a cat I saw?")' }
    ]
  },
  {
    id: 4,
    title: "Fibonacci Recursion",
    difficulty: "Medium",
    description: "Write a function `fibonacci(n)` that returns the n-th Fibonacci number. The sequence starts with `0` and `1`: `fib(0) = 0`, `fib(1) = 1`, `fib(2) = 1`, `fib(3) = 2`, etc.",
    template: `function fibonacci(n) {
  // Write your code here
  
}`,
    functionName: "fibonacci",
    tests: [
      { input: [0], expected: 0, label: "fibonacci(0)" },
      { input: [1], expected: 1, label: "fibonacci(1)" },
      { input: [5], expected: 5, label: "fibonacci(5)" },
      { input: [10], expected: 55, label: "fibonacci(10)" }
    ]
  },
  {
    id: 5,
    title: "Binary Search Tree",
    difficulty: "Hard",
    description: "Write a function `isValidBST(root)` that takes the root of a binary tree and returns `true` if it is a valid Binary Search Tree (BST), and `false` otherwise.\n\nA valid BST is defined as:\n- The left subtree of a node contains only nodes with keys less than the node's key.\n- The right subtree of a node contains only nodes with keys greater than the node's key.\n- Both the left and right subtrees must also be binary search trees.",
    template: `// Node structure: { val: number, left: Node|null, right: Node|null }
function isValidBST(root) {
  // Write your code here
  
}`,
    functionName: "isValidBST",
    tests: [
      { 
        input: [{ val: 2, left: { val: 1, left: null, right: null }, right: { val: 3, left: null, right: null } }], 
        expected: true, 
        label: "Valid BST: root=[2,1,3]" 
      },
      { 
        input: [{ val: 5, left: { val: 1, left: null, right: null }, right: { val: 4, left: { val: 3, left: null, right: null }, right: { val: 6, left: null, right: null } } }], 
        expected: false, 
        label: "Invalid BST: root=[5,1,4,null,null,3,6] (right node 4 has a left child 3)" 
      }
    ]
  },
  {
    id: 6,
    title: "Two Sum",
    difficulty: "Easy",
    description: "Write a function `twoSum(nums, target)` that takes an array of integers `nums` and an integer `target`, and returns the indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice. Return the answer as an array of two indices (order does not matter).",
    template: `function twoSum(nums, target) {
  // Write your code here
  
}`,
    functionName: "twoSum",
    tests: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1], label: "twoSum([2, 7, 11, 15], 9)" },
      { input: [[3, 2, 4], 6], expected: [1, 2], label: "twoSum([3, 2, 4], 6)" },
      { input: [[3, 3], 6], expected: [0, 1], label: "twoSum([3, 3], 6)" }
    ]
  },
  {
    id: 7,
    title: "Merge Intervals",
    difficulty: "Medium",
    description: "Write a function `mergeIntervals(intervals)` that takes an array of intervals where `intervals[i] = [start_i, end_i]`, merges all overlapping intervals, and returns an array of the non-overlapping intervals that cover all the intervals in the input.",
    template: `function mergeIntervals(intervals) {
  // Write your code here
  
}`,
    functionName: "mergeIntervals",
    tests: [
      { 
        input: [[[1, 3], [2, 6], [8, 10], [15, 18]]], 
        expected: [[1, 6], [8, 10], [15, 18]], 
        label: "mergeIntervals([[1,3],[2,6],[8,10],[15,18]])" 
      },
      { 
        input: [[[1, 4], [4, 5]]], 
        expected: [[1, 5]], 
        label: "mergeIntervals([[1,4],[4,5]])" 
      }
    ]
  },
  {
    id: 8,
    title: "Valid Parentheses",
    difficulty: "Easy",
    description: "Write a function `isValidParentheses(s)` that takes a string containing just the characters `(`, `)`, `{`, `}`, `[` and `]` and determines if the input string is valid.\n\nAn input string is valid if:\n- Open brackets must be closed by the same type of brackets.\n- Open brackets must be closed in the correct order.",
    template: `function isValidParentheses(s) {
  // Write your code here
  
}`,
    functionName: "isValidParentheses",
    tests: [
      { input: ["()"], expected: true, label: 'isValidParentheses("()")' },
      { input: ["()[]{}"], expected: true, label: 'isValidParentheses("()[]{}")' },
      { input: ["(]"], expected: false, label: 'isValidParentheses("(]")' },
      { input: ["([)]"], expected: false, label: 'isValidParentheses("([)]")' },
      { input: ["{[]}"], expected: true, label: 'isValidParentheses("{[]}")' }
    ]
  },
  {
    id: 9,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    description: "Write a function `lengthOfLongestSubstring(s)` that returns the length of the longest substring without repeating characters. For example, `lengthOfLongestSubstring(\"abcabcbb\")` should return `3` (\"abc\").",
    template: `function lengthOfLongestSubstring(s) {
  // Write your code here
  
}`,
    functionName: "lengthOfLongestSubstring",
    tests: [
      { input: ["abcabcbb"], expected: 3, label: 'lengthOfLongestSubstring("abcabcbb")' },
      { input: ["bbbbb"], expected: 1, label: 'lengthOfLongestSubstring("bbbbb")' },
      { input: ["pwwkew"], expected: 3, label: 'lengthOfLongestSubstring("pwwkew")' },
      { input: ["default_empty"], expected: 0, label: 'lengthOfLongestSubstring("")' }
    ]
  },
  {
    id: 10,
    title: "LRU Cache",
    difficulty: "Hard",
    description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) Cache.\n\nImplement the `LRUCache` class:\n- `LRUCache(capacity)` Initialize the LRU cache with positive size `capacity`.\n- `get(key)` Return the value of the `key` if the key exists, otherwise return `-1`.\n- `put(key, value)` Update the value of the `key` if the `key` exists. Otherwise, add the `key-value` pair to the cache. If the number of keys exceeds the `capacity` from this operation, evict the least recently used key.",
    template: `class LRUCache {
  constructor(capacity) {
    // Write your code here
    
  }

  get(key) {
    // Write your code here
    
  }

  put(key, value) {
    // Write your code here
    
  }
}`,
    functionName: "LRUCache",
    tests: [
      { 
        input: [
          ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"],
          [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
        ],
        expected: [null, null, null, 1, null, -1, null, -1, 3, 4],
        label: "Cache capacity 2: put(1,1), put(2,2), get(1), put(3,3) [evicts 2], get(2) [-1], put(4,4) [evicts 1], get(1) [-1], get(3) [3], get(4) [4]"
      }
    ]
  }
];

export default challenges;