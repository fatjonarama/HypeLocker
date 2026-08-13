"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/format";

function FlagKosovo() {
  return (
    <svg viewBox="0 0 640 480" width="20" height="15" aria-hidden="true">
      <path fill="#244AA5" d="M0 0h640v480H0z" />
      <path
        fill="#D0A650"
        d="M253 224.8s1.2-.8 1.6-.9l2-.6s1-.5 1.5-.5 1.6.6 2 1.1 2 1.4 2 1.4 1.2.4 1.5 0q.4-.6 1.3-.7.7-.2.6-.9c-.1-.7.2-.9.6-1.4.5-.5 1.3-.8 1.3-.8s1.2-.5 1.3-1.2 1.3-1.2 2-1.3c.7 0 0-.4 1.8-.2 1.7.2 2-.4 2-.9.1-.5 0-1 1.1-1q1.6.4 1.6-.4c0-.6 1-1-.7-1.4-1.8-.5-1.6-.1-1.8-1 0-.7 0-.6-1.1-.7s-.6-.7-.7-1.3q-.2-.9-.6-1.3c-.3-.4-.9-.4-.9-1s-.1-1-.7-1q-1 .1-1-.5 0-1 .8-1 1-.2 1-1.2c-.2-.6-.2-1.9-.2-1.9l.9-1s2.6-2.1 2.8-2.5 1.1-.7 1.5.1.6 1 1 1.4c.3.4 1.3.1 1.5-.3s.3-1.9.9-2.7q1-.9 1.1-1.8.2-1.3 1.2-1.2c.6 0 1-.9 1-1.4q0-.8 1.2-1.2c.8-.1 1.3-.6 1.6.2s.6.7 1.1 1q1 .6 1.8.3c.5-.4.7-1 1.3-.7q.9.5 1.2-.7l.3-1.9s.1-.5 1.1-.5.3-.6.8-1 .6-.8 1.3-.6 1.8-.3 1.3-1-1.8-1.6-1.1-2.4 1-2 .3-2.2c-.7-.1-1.8.1-1.9-.6-.1-.8-.4-1.4.5-1.5s2.2-.1 2.7-.5 1.8-.7 1.8-1.8.4-1.3.6-2 .1-2-.5-2.6-1.4-1.6-1.5-2q-.3-.7-1.6-1.3c-.8-.2-1.6-.4-1.6-1s.6.1.6-1.6-1.1-2-1.1-2l-1.7-1s-3-.8-3.8-.8-1.8-.8-.9-1.4 1.2-1.5.9-2.2c-.4-.7-.6-1.3-1.9-1.6q-2-.3-1-1.4c.5-.7.7-1.3 1.4-.7.6.5 1.8.7 2.7.3s1.3-.8 1.8-.3 1 .8 1.7.2 2-.8 2.6-.5c.5.4 2 .3 2.4 0s1.4-1 1.4-1.3.6-1.2 1.1-1.5 1.3-1.4 1.9-1.4.8-.7.8-1c0-.5.5-1.4.6-1.7s1.2-.8 2 0c.9.5 2 .8 2 .8s1 .2 1.7 0a2 2 0 0 1 2.1 0c.9.6 2 .6 2 .6l.3-1.3c0-.4.2-1.2-.3-1.5s-1-.7-.1-1.4 1-.5 1.9-.5l2.2.1c.7 0 1.8.7 1.8 1.3q.1.8 1 1.4c.6.3 1.3.6 1 1.2q-.3 1 .6.8 1 0 .9.9-.1.7 1 1 1 .4 1 1.2c0 .8-.2.9 0 1.4l1 1.4s1.3 1.5-.4.7c-1.6-.7-2-1-2.5-1l-1 .5-1.3.2c-.6 0-1.2 1.2-.2 1.4q1.3.2 1.2 1.2c-.1 1-.3.5-.8 1s-.8.2-1.6.2-1 .7-1 1.3.3.6.6 1q.6 1 1.6.2c.5-.5 1-.9 1.3.1s.9 1 1.5 1q.9.1 1.6-.4 1-.5 1.3.9.4 1 1.3 1.3t1 1q.3 1 1.1.5 1.1-.7 1.9-.1l.9 1.2v1.1l2.3.8.2 1q0 .6 1 .4h1.6s.8-.3.8-1q0-.9 1-.8c.5 0 1.8.5 2.1-.2s1.4-.8 2.2-.5l3 1.2s-.3 0 .4 1.1 2 1.1 2 1.1 0 1 .3 1.4 1.3.6 1.8.2q1-.8 2.1-1c1.1-.2 1.2 0 1.2-.4s-.7-.7-.7-1.4.7-.6.8-1.3c.1-.6.8 0 1.3.4s1 .8 1 1.2c0 .5 1 2 1.5 2.2s2.1.3 2.6-.2 1.6-.8 1.5.5-.4 1.4.4 1.8 1 2 .3 2.4-1 .5-1 1.2-.2 1.6.4 2q1 .7 1 1.2c0 .5.6 2.4.6 2.4s.4 1.9.2 2.3c0 .5-.3 1.2.7 1.1q1.4-.3 1.3.7c-.1 1 .4 1.2-.2 1.5s-1 1.4-.4 1.6q.9.3 1.2 1c.1.4 1 1.2 1.6.7s.7-.6 1.2-.7.8-.4.3-1q-.7-.8-.1-1.4c.5-.3.7-1.3.7-1.3s.7-1 1.5 0 1 .6 1.5.6.8.5.8 1 1.2.5 1.2 1.3l.2 3s0 1.1.7 1.5q1 .6.2 1-.3 1-.2 2c.1 1 .2.5-.3 1q-1 .7-.5 1.6c.3.6.2 1 1.1 1.8 1 .7.9 1 .9 1.6 0 .5.9 1.3.9 1.8s.7 1.2 1.3 1.3 1.2 1 1.2 1.6l.1 1.9s0 .3.6.3 1.2.8 1.4 0c.2-1 1-1 1.4-1.3s1.4-.6 1.9-.3 1 .3 1.5.3l2.6.1s.6 0 1 .8c.3.8 1.3 1.8.8 2.2s-.6 1.3 0 1.3 1.5 0 1.5.5q-.2 1 .7.7.8-.5 1.1 0t1.3.7q.8.4 1.2-.3c.3-.4 1.7-.8 1.7-.8s1.8-.5 2.5-.3l1.7.7s.4 1 .2 1.7-.5.5-.2 1.5-.3 1-.7 1q-.9-.5-1 .7c0 .8-.4 1-.4 1.8s0 .6-.5 1q-.8.6.1 1c.7 0 .5.8.5 1.2l-.1 1.4s0 .5-.7.5-1.5 0-1.6.5-1 1.3-.3 1.9q1 .7.1 1c-.4.3-.8 1.3.2 1.6q1.2.5.2 1.1c-.6.4-1.7.8-1.7 1.4s-.3.6-1 .7q-1.2.3-.2 2c.8 1.1 1 1 1.6 1s.6-1 .6-1l2.5.2q1 0 1.9-.3c.5-.4 1.7-.9 1.7 0s.3 1 .8 1.3c.6.5.7.1 1.2.8.5.6.6 0 1-.7.3-.7 1-1.4 1.6-.6.5.9.5.6 1.2.6s1 .4 1 .9.6.5 1.5.4.9.5 1.2 1 .5.4 1 .4q.7.1 1.2-.4c.4-.4.8-1 1.3-.3s1.4.5 1.6-.2c.3-.8 1.3-1.4 1.9-.6.6.9 1 .9 1.6 1q1-.2 1.7.6c.4.6 1.5 1.4.7 2s-1.7 1.5-1 1.8a3 3 0 0 1 1.6 1c.5.4 2 .7 2.7.8.7 0 1.2.2 2-.5s1.7-.6 1.6.3.3 1.8.3 1.8.6 1.4.6 1.9-.1.6 1 1.3c1 .6.8 1 1.7.4q1.1-.8 1-1.5v-1.7s1.2-.2 1.6-.5c.5-.4 2.3-1.3 2.8-.9s1 .3 1.5.1l1.9-.2c.4 0 1.2.1 2.2-.6.9-.8.9-.6 1.5 0q.7.8.2 1.6c-.4.4 0 1.3.8 1.3s1 .5 1 1l.3 1.7c0 .4 0 .7 1.4 1 1.2.3 1 1 1.2 1.6q.6.9-.4 1c-1 .1-1 .3-1 .8-.2.5-1.2.7-1.2.7l-1-.2s-.8 0-1.1.4-1 1.3-.6 2q.7 1.1 0 1.6c-.4.3-.7 1.9-1.1 1.6-.5-.4-1 0-1.5.3s-.4 1.7.5 2.2q1.4 1.1 1.2 1.3l1 1.6s-.3.3-.5.9c-.3.5-1 1.6-.3 1.8s.4 1.4-.3 1.4-1.5-.4-1.6.5-.5.6-1.2.5-2.4-.5-2.9.3-.6 1.2-1.4 1.1-.5 1.3-.2 1.8l1 1.3s.7.5.7 1.6q-.1 1.4-1 .2c-.4-.7-1.3-.6-1.4.2s-.3 2.2-1 2.2q-1.2 0-1.6.6c-.3.4-.9 1.2-.9 1.6s-.1.9-.7 1-.7 1.2-.7 1.2-1.4.3-1.5.8.1 1.4-1 1.5a3 3 0 0 0-2.2 1.4q-.7.7 0 1.5c.7.8.8 2.2 1.4 2.5q.9.3.9 1.3c-.1.9-.8 1.5.1 1.5q1.6-.1 1.2 1c-.4.7-.4.8-1 1.1-.8.4-1.1.4-1.1 1.2s.2.9-.4 1.2-.6.7-.6 1.4-.2.4-.9 1.1q-1.2 1-2.2.6c-1-.4-.7-.2-.8-.9s-1.1-.6-1.7-.5-1.4.7-1.4.7-1 .7-.6 1.2.2 1.4-.6 1.3-2.6.8-3.2-.1-2.2-1.6-2.5-.3c-.2 1.2.7 1.1.6 2.4s-.3 1.3-.8 1.7q-.5.6-.6 1.3c0 .5-.2 1.7.6 2.1s1.2 1.6 1.2 2.3q-.2 1.1.8 1.3 1.5.2 1.6-.9c.1-.7 1.7-1.2 1.9.3q-.2 2.1.7 2.9c.5.6 1 1.5 1.5 1.8s1.2 3 1.2 3c-1.1.3-1.4 1.8-2.1 2-.4.2-.9 0-1.3.3q-.1.6-.6.8c-.9.4-.7-.9-1.8-.4-.9.4-1 1.5-2.3 1-.7-.2-1.1-3-1.3-3.6l-1.1-1.8c-.8-1.2-2.3 0-2.8-.4-.8-.5-.5-1.4-1.7-1.5-2.4-.2-.7 1.5-1.7 1.8-2 .7-2-1.8-3.4-.6-.5.4 1 .7.6 1.4-.3.6-1.7 1.6-1.7 2.3.2 1 1.2 1.3 1.5 2 1 2.3-.5 3.8-2.7 2-1.2-.9-1.5-2.7-3.3-2.5l-1 .5c-.5 0-.8-.4-1.3-.3-.7.3 0 .8-.2 1.2 0 0-1 .7-1 1-.6.6-.4 1.2-1.2 1.8-.6.5-1.1.2-1.8 1-.7.7-.8 1.9-1.7 2.6-.5.4-.8-1.1-1.4-.1l-.2.4q-.3.4 0 .7c1.2 2.4-1.4 3.2-2.2 4.9-.3.7.6 1.3.3 1.9l-1.5 1.7c0 .2-.2.8-.4 1s-1 0-1 .4.8.7 1 .9-.2.7 0 .8c1.2 1.3.5.9 1.1 2 .1.2.5-.1.7.3s-.4.4-.2.8c0 .2 1 1.4 1 1.4 0 .4-1.8 1.2-2.2 1.2-1.1 0 1-2.2-.8-2.2-.8 0-.9 1.7-1 2h-1c-1.2 0-2 1.4-2.4 1.5s-1-.2-1.5 0c-.4 0-1 .5-1.4.5q-.4 0-.7-.4c-.5-.3-1.5-.4-2-.6-.4 0-1 .4-1.2.3-.3-.2.3-1-.6-1.4l-.7-1.7q.6-1.5.5-3.1c-.2-1.1-2-2-2.4-3-.3-.6-.6-2.4-1.3-2.8a6 6 0 0 1-1.8-2.2c0-.2.3-.6 0-1q-.6-.4-1-1c-.1-.4 0-1.8-.5-2.1s-4-.8-5-.9q-.6 0-1-.3l-.6-.7-1 .2h-1c-1.1.7-1.4 1.7-2.5 2.6-1.1.8-2.3.8-3.4 1.7-.7.6-1.2 2.1-1.9 2.8-.3.3-.7 0-.8.1l-2 1.8q0 .3-.2.5l-1.3.4h-1.2c-.5.2-.5.8-2.5 1.2l-.5.3-.6.5h-.9c-.5 0-.8.5-1.2.5-1 .2-2.8-.5-3.6-.1-.5.1-1.8 1.7-2.3 1.8q-.4.1-1-.1l-.6 2.2-2.4 2.1-.8 1q-.5.5-1 .5l-1.6-.4c-.8-.2-3.3-.3-4-.1-.9.1-.6 2.4-2.6 2.6l-3.3.4c-.1 0-.8-.4-1.5-.3-.3.1-1.1 1-1.1 1.2v.5l.2.4c-.4.5-1.4 1.3-1.7 2l-.4.4c-.2.2-1.6.7-1.7.9-.3.8 1 1.6.8 1.9-.3 1-1.7 2-2.2 3-.1.4.5 1.7.5 2.1q-.5 2.1-.5 4.1l.2 1.7.7.5 1.8 3.6c.3 2.2-3 1.4-1 3.6q.2.6.8 1l2.8 2.3c0 .4-2 .7-2.3 1-1 1-1.7 2.6-2.6 3.6-.6.5-1-.1-1.8 1.3-.2.5 0 1.6-.3 2-.5.4-.8-.2-1.3 0-.2 0-.3.7-.5.8-.5.5-5.2 3-5.6 2.7-.2-.1-.5-.9-.5-1.1q-.1-.6-.6-1c-1.2-1-3-1.3-4.2 0l-.7 1-2 1.6-.5.5c-.5 0-1.6-1.3-2-1.7-.4-.6-2-2-2.1-2.7 0-2.4-1.9-4.9-2.6-7.2h1.1c1.3-.9 1-3 3.3-2.2.3-.4.3-.8.8-1l.7-.5c.8-1.2 1.7-5.8.9-7-.7-1-1.5-1-2-2.7q-.1-.7 0-1.6l-1-3.1-.7-.7-.2-3.1c-.7-2.2-3.4-3.5-3.5-3.8l-1-1.7-.6-1.6c-.1-.3-.6-.6-.6-.9 0-.6 1.6-1.7 1.5-2.7 0-.3-1-1.3-.8-1.8s1.2-1.8 1.2-2.5c0-.8-1.6-2.6-1.8-3.4-.1-.5.6-.8.4-1.1s-1.8-1.9-2-2.3c-.3-.3.5-.7 0-1.3-.6-.5-.1-.4-.3-.8l-1-1.5c-.2-.5-1.6-5.5-1.5-5.8q-.5-.4-.9-1l-.4-1.2s-1.6-.5-1.9-1c-.2-.3-.3-1.6-.7-2.2l-.7-.4-.3-.7c-.5-.6-1.4 0-2-2.4q-1.4-.8-2.4-1.8l-.4-.4q-1-.2-2-.7c-.3 0-1.8 0-2-.2l-.4-.8c-.8-.1-2.2 0-2.9-.6-.5-.5-.6-2.8-1.6-2.5h-.4c-.7-1-2.9-1-3.8-1.6-.2-.1-1 0-1-.2l.1-1.3-1.1-1.4c-.9-.2-.6-.3-1-.6-1.5 0-1.7.2-2.6 1q-.4.3-1 .4c-.5.3-.6 1.2-1.3.8l-.6-.5c-.4-.4-.6-.2-.8-.8-1.2-.7-4.5 1.5-5.2 0-.6-.3-1 0-1.5-.4-.2-.2.7-3-1.7-4l1.6-1.1q.2-.6 0-1c0-.5.3-1.4.2-1.7l-.5-1-.2-1.2-.8-.4q-1-.6-1.7-1.4l-.4-.5c-.4-.3-1.8-.8-1.8-1.4l.4-.5q0-.5.3-.8c.6-1 2.1-.5 1.9-2.2-.1-.8-.7-1.4-.8-2.2l-.5-.7c-1.5-.1-1.3-1.6-1.8-2-1.5-1-2.7-.4-1-2.4.2-.7-1.5-1.8-1.8-2.1-.6-.6-.3-1.9-.6-2.5 0-.3-1.1-.9-1.4-1.3l-.5-1v-.1q.4-.6 0-1c-.1-.3-.6-.2-.7-.4q-2-1.6-4.9-2.5c-.5-.2-.3-.6-.8-.8l-3-1.2c-.2 0-.4-1.1-.6-1.5l-.9-1c0-1-.6-1-1.4-1.6v-.6l.6-2.1c.1-.4.6-.8.5-1.2l-.4-2.3c-.8-2-1.7-1.8-1.2-4.5q-.2-.8.3-1.4l.2-.3 1.2-.9c.4-.6.7-1.9 1.2-2.3l1.8-1.2c.2-.2.4-.9.3-1.2l-1.2-.2-1.1-.4-.3-.5-.2-.2q-.8-.1-1.4-.5l-1.7-.5c-1-.5-2-2-2.9-2.2-1.2-.3-2 .1-3.2.2-.7 0-.7-.4-1.3-.6-.8-.3-.2.4-2-.2-.3-.2 0-.8 0-1h-1c-1.4-.4-.9-1.8-1.3-2.7-.1-.2-.8-.2-1-.2l-.2-.2.2-.1c.2-.4-.7-1.4-.7-1.6.1-.3 2-.6 2.2-.6q0-.4-.2-.7.1-.8.5-1.7v-.2c-.6-.3-.7-.7-1.2-1q.1-.4.4-.7c.9-2.5 2.3-.5 3.5-2.8l.6-1.1h.2q.4.1.8 0l.8-.3h.5c2.2-.4 1.7-1.2 3-2.1.4-.3 1.4-.4 1.8-.6q.7.6 2.1 1.4c.7.2 3 .7 3.4 1 .5.2.6.8 1 1 1.3.8.5-.4 1.8-.2s2.3 1.4 3.5 1.9l1-.1c.3-.1 2.3-.5 2.5-.4l.8.3c.3.1.5-.5.8-.5.8.2.8.5 2 .4 0 0 .6-3.3 1.2-3.4.3-.1 1.2.7 1.4.8.4.1 0-.7 0-.7-.2-.3-.8-2.3-.7-2.5l.8.1q1-.2 2-.9l1-1.5c.1-.2-.2-.8 0-1l.9-.6c.4-.4.4-1 1-1.3 2-.2 2.7-1.8 4.6-2h.6l.4.6c0 .1 1.3.9 1.5.8q.3-.1.5-.4c.3.1 1.4-.5 1.5-.9l-.1-.6 1.6-1.2h1.4q.2.4.5.6h1.2c.2 0 .3-.5.7-.5"
      />
      <path
        fill="#FFF"
        d="M351.9 73.4 368 123l-42.2-30.7H378L335.8 123zm62.8 11.1 16 49.6-42.1-30.7h52.1l-42.2 30.7zm59.9 21.8 16 49.6-42.1-30.7h52.1L458.4 156l16.2-49.6zM288.1 73.4 272 123l42.2-30.7H262l42.2 30.7zm-62.8 11.1-16 49.6 42.1-30.7h-52.1l42.2 30.7zm-59.6 21.8 16.2 49.6-42.2-30.7h52.1l-42.2 30.7z"
      />
    </svg>
  );
}

function FlagAlbania() {
  return (
    <svg viewBox="0 0 640 480" width="20" height="15" aria-hidden="true">
      <path fill="red" d="M0 0h640v480H0z" />
      <path
        id="al-a"
        fill="#000001"
        d="M272 93.3c-4.6 0-12.3 1.5-12.2 5-13-2.1-14.3 3.2-13.5 8q2-2.9 3.9-3.1 2.5-.3 5.4 1.4a22 22 0 0 1 4.8 4.1c-4.6 1.1-8.2.4-11.8-.2a17 17 0 0 1-5.7-2.4c-1.5-1-2-2-4.3-4.3-2.7-2.8-5.6-2-4.7 2.3 2.1 4 5.6 5.8 10 6.6 2.1.3 5.3 1 8.9 1s7.6-.5 9.8 0c-1.3.8-2.8 2.3-5.8 2.8s-7.5-1.8-10.3-2.4c.3 2.3 3.3 4.5 9.1 5.7 9.6 2 17.5 3.6 22.8 6.5a37 37 0 0 1 10.9 9.2c4.7 5.5 5 9.8 5.2 10.8 1 8.8-2.1 13.8-7.9 15.4-2.8.7-8-.7-9.8-2.9-2-2.2-3.7-6-3.2-12 .5-2.2 3.1-8.3.9-9.5a274 274 0 0 0-32.3-15.1c-2.5-1-4.5 2.4-5.3 3.8a50 50 0 0 1-36-23.7c-4.2-7.6-11.3 0-10.1 7.3 1.9 8 8 13.8 15.4 18s17 8.2 26.5 8c5.2 1 5.1 7.6-1 8.9-12.1 0-21.8-.2-30.9-9-6.9-6.3-10.7 1.2-8.8 5.4 3.4 13.1 22.1 16.8 41 12.6 7.4-1.2 3 6.6 1 6.7-8 5.7-22.1 11.2-34.6 0-5.7-4.4-9.6-.8-7.4 5.5 5.5 16.5 26.7 13 41.2 5 3.7-2.1 7.1 2.7 2.6 6.4-18.1 12.6-27.1 12.8-35.3 8-10.2-4.1-11 7.2-5 11 6.7 4 23.8 1 36.4-7 5.4-4 5.6 2.3 2.2 4.8-14.9 12.9-20.8 16.3-36.3 14.2-7.7-.6-7.6 8.9-1.6 12.6 8.3 5.1 24.5-3.3 37-13.8 5.3-2.8 6.2 1.8 3.6 7.3a54 54 0 0 1-21.8 18c-7 2.7-13.6 2.3-18.3.7-5.8-2-6.5 4-3.3 9.4 1.9 3.3 9.8 4.3 18.4 1.3s17.8-10.2 24.1-18.5c5.5-4.9 4.9 1.6 2.3 6.2-12.6 20-24.2 27.4-39.5 26.2-6.7-1.2-8.3 4-4 9 7.6 6.2 17 6 25.4-.2 7.3-7 21.4-22.4 28.8-30.6 5.2-4.1 6.9 0 5.3 8.4-1.4 4.8-4.8 10-14.3 13.6-6.5 3.7-1.6 8.8 3.2 9 2.7 0 8.1-3.2 12.3-7.8 5.4-6.2 5.8-10.3 8.8-19.9 2.8-4.6 7.9-2.4 7.9 2.4-2.5 9.6-4.5 11.3-9.5 15.2-4.7 4.5 3.3 6 6 4.1 7.8-5.2 10.6-12 13.2-18.2 2-4.4 7.4-2.3 4.8 5-6 17.4-16 24.2-33.3 27.8-1.7.3-2.8 1.3-2.2 3.3l7 7c-10.7 3.2-19.4 5-30.2 8l-14.8-9.8c-1.3-3.2-2-8.2-9.8-4.7-5.2-2.4-7.7-1.5-10.6 1 4.2 0 6 1.2 7.7 3.1 2.2 5.7 7.2 6.3 12.3 4.7 3.3 2.7 5 4.9 8.4 7.7l-16.7-.5c-6-6.3-10.6-6-14.8-1-3.3.5-4.6.5-6.8 4.4 3.4-1.4 5.6-1.8 7.1-.3 6.3 3.7 10.4 2.9 13.5 0l17.5 1.1c-2.2 2-5.2 3-7.5 4.8-9-2.6-13.8 1-15.4 8.3a17 17 0 0 0-1.2 9.3q1.1-4.6 4.9-7c8 2 11-1.3 11.5-6.1 4-3.2 9.8-3.9 13.7-7.1 4.6 1.4 6.8 2.3 11.4 3.8q2.4 7.5 11.3 5.6c7 .2 5.8 3.2 6.4 5.5 2-3.3 1.9-6.6-2.5-9.6-1.6-4.3-5.2-6.3-9.8-3.8-4.4-1.2-5.5-3-9.9-4.3 11-3.5 18.8-4.3 29.8-7.8l7.7 6.8q2.3 1.5 3.8 0c6.9-10 10-18.7 16.3-25.3 2.5-2.8 5.6-6.4 9-7.3 1.7-.5 3.8-.2 5.2 1.3 1.3 1.4 2.4 4.1 2 8.2-.7 5.7-2.1 7.6-3.7 11s-3.6 5.6-5.7 8.3c-4 5.3-9.4 8.4-12.6 10.5-6.4 4.1-9 2.3-14 2-6.4.7-8 3.8-2.8 8.1 4.8 2.6 9.2 2.9 12.8 2.2 3-.6 6.6-4.5 9.2-6.6 2.8-3.3 7.6.6 4.3 4.5-5.9 7-11.7 11.6-19 11.5-7.7 1-6.2 5.3-1.2 7.4 9.2 3.7 17.4-3.3 21.6-8 3.2-3.5 5.5-3.6 5 1.9-3.3 9.9-7.6 13.7-14.8 14.2-5.8-.6-5.9 4-1.6 7 9.6 6.6 16.6-4.8 19.9-11.6 2.3-6.2 5.9-3.3 6.3 1.8 0 6.9-3 12.4-11.3 19.4 6.3 10.1 13.7 20.4 20 30.5l19.2-214L320 139c-2-1.8-8.8-9.8-10.5-11-.7-.6-1-1-.1-1.4s3-.8 4.5-1c-4-4.1-7.6-5.4-15.3-7.6 1.9-.8 3.7-.4 9.3-.6a30 30 0 0 0-13.5-10.2c4.2-3 5-3.2 9.2-6.7a86 86 0 0 1-19.5-3.8 37 37 0 0 0-12-3.4zm.8 8.4c3.8 0 6.1 1.3 6.1 2.9s-2.3 2.9-6.1 2.9-6.2-1.5-6.2-3c0-1.6 2.4-2.8 6.2-2.8"
      />
      <use xlinkHref="#al-a" width="100%" height="100%" transform="matrix(-1 0 0 1 640 0)" />
    </svg>
  );
}

function FlagNorthMacedonia() {
  return (
    <svg viewBox="0 0 640 480" width="20" height="15" aria-hidden="true">
      <path fill="#d20000" d="M0 0h640v480H0z" />
      <path
        fill="#ffe600"
        d="M0 0h96l224 231.4L544 0h96L0 480h96l224-231.4L544 480h96zm640 192v96L0 192v96zM280 0l40 205.7L360 0zm0 480 40-205.7L360 480z"
      />
      <circle cx="320" cy="240" r="77.1" fill="#ffe600" stroke="#d20000" strokeWidth="17.1" />
    </svg>
  );
}

const PHONE_CODES: { code: string; flag: () => React.JSX.Element; label: string }[] = [
  { code: "+383", flag: FlagKosovo, label: "Kosovo" },
  { code: "+355", flag: FlagAlbania, label: "Albania" },
  { code: "+389", flag: FlagNorthMacedonia, label: "North Macedonia" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotalCents } = useCart();
  const [name, setName] = useState("");
  const [phoneCode, setPhoneCode] = useState("+383");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("kosovo");
  const [notes, setNotes] = useState("");
  const [website, setWebsite] = useState(""); // honeypot, left empty by real users

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setName(data.user.name);
      })
      .catch(() => {});
  }, []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-3xl uppercase">Your Cart is Empty</h1>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-full border-2 border-black bg-hl-lime px-6 py-3 font-tag text-sm font-bold uppercase text-hl-bg"
        >
          Shop All
        </Link>
      </main>
    );
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name,
            phone: `${phoneCode} ${phone}`.trim(),
            address,
            country,
            notes,
            website,
          },
          items: items.map((i) => ({
            productId: i.productId,
            size: i.size,
            quantity: i.quantity,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to place order");
      router.push(`/checkout/success?orderId=${data.orderId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl uppercase mb-2">Checkout</h1>
      <p className="mb-8 font-tag text-sm text-hl-grey uppercase">
        Cash on delivery — pay when your order arrives.
      </p>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          <label className="flex flex-col gap-1 font-tag text-xs uppercase text-hl-grey">
            Full Name
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-md border-2 border-hl-ink bg-transparent px-3 py-2 font-body text-sm normal-case text-hl-ink"
            />
          </label>
          <label className="flex flex-col gap-1 font-tag text-xs uppercase text-hl-grey">
            Phone Number
            <div className="flex gap-2">
              <div className="relative">
                <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 overflow-hidden rounded-[2px]">
                  {(() => {
                    const Flag =
                      PHONE_CODES.find((c) => c.code === phoneCode)?.flag ??
                      FlagKosovo;
                    return <Flag />;
                  })()}
                </span>
                <select
                  value={phoneCode}
                  onChange={(e) => setPhoneCode(e.target.value)}
                  aria-label="Country code"
                  className="rounded-md border-2 border-hl-ink bg-hl-bg py-2 pl-8 pr-2 font-body text-sm normal-case text-hl-ink"
                >
                  {PHONE_CODES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code}
                    </option>
                  ))}
                </select>
              </div>
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="44 123 456"
                className="w-full min-w-0 rounded-md border-2 border-hl-ink bg-transparent px-3 py-2 font-body text-sm normal-case text-hl-ink"
              />
            </div>
          </label>
          <label className="flex flex-col gap-1 font-tag text-xs uppercase text-hl-grey">
            Country
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="rounded-md border-2 border-hl-ink bg-hl-bg px-3 py-2 font-body text-sm normal-case text-hl-ink"
            >
              <option value="kosovo">Kosovo</option>
              <option value="albania">Albania</option>
              <option value="macedonia">North Macedonia</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 font-tag text-xs uppercase text-hl-grey">
            Home Address
            <textarea
              required
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="rounded-md border-2 border-hl-ink bg-transparent px-3 py-2 font-body text-sm normal-case text-hl-ink"
            />
          </label>
          <label className="flex flex-col gap-1 font-tag text-xs uppercase text-hl-grey">
            Notes (optional)
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. leave with neighbor, call before delivery..."
              className="rounded-md border-2 border-hl-ink bg-transparent px-3 py-2 font-body text-sm normal-case text-hl-ink"
            />
          </label>

          {error && <p className="font-tag text-sm text-hl-pink">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-full border-2 border-black bg-hl-lime py-3 font-tag text-sm font-bold uppercase text-hl-bg disabled:opacity-60"
          >
            {loading ? "Placing Order…" : "Place Order — Pay on Delivery"}
          </button>
        </form>

        <div>
          <h2 className="font-tag text-xs uppercase text-hl-grey mb-3">
            Order Summary
          </h2>
          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <div
                key={item.key}
                className="flex justify-between font-tag text-sm"
              >
                <span>
                  {item.quantity}× {item.name}
                  {item.size ? ` (${item.size})` : ""}
                </span>
                <span>{formatPrice(item.priceCents * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t-2 border-hl-ink pt-3 font-display text-xl">
            <span>Total</span>
            <span>{formatPrice(subtotalCents)}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
