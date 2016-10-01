# jumpblock README

JumpBlock is a simple VSCode extension to navigate files by empty lines in addition to the usual navigate by line or page up/down.

## Features

Navigating by empty lines is intuitive because most programmers separate imperative sequences and functions with one or more whitespace lines, so you essentially end up navigating quickly between ideas.


Currently there's just two shortcuts:
jumpBlock.up
jumpBlock.down

I like to bind them to ctrl+up and ctrl+down so I can hold the ctrl key down to navigate left and right by word, and up and down by block.

Ex.
{
    "key": "ctrl+up",
    "command": "jumpBlock.up"
},
{
    "key": "ctrl+down",
    "command": "jumpBlock.down"
}

## Release Notes

### 0.0.1

Initial push of JumpBlock