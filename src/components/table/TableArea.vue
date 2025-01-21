<template>
  <table class="w-full table-auto border-collapse border border-slate-400 text-left">
    <thead>
      <slot name="thead"></slot>
    </thead>
    <tbody class="bg-white">
      <slot name="tbody"></slot>
    </tbody>
  </table>
</template>
