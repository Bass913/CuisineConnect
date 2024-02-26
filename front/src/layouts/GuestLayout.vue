<template>
    <div class="flex min-h-screen flex-1">
      <slot/>
      <div class="relative hidden w-0 flex-1 lg:block">
        <img class="absolute inset-0 h-full w-full object-cover" src="/tic-tac-toe-wallpaper.jpeg" alt="Tic Tac Toe" />
      </div>
    </div>
  </template>