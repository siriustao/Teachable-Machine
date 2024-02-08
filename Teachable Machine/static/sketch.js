// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Global variable to store the classifier
let classifier;

// Explanation text (start by showing listening)
let explanation = "Listening for a poker hand...";

// Image variable
let pokerHandImage;

// Teachable Machine model URL:
let soundModelURL = 'https://teachablemachine.withgoogle.com/models/0ec8N3JSd/model.json';

function preload() {
  // Load the model
  classifier = ml5.soundClassifier(soundModelURL);

  // Load default image
  pokerHandImage = loadImage('/static/hands/default.png');
}

function setup() {
  createCanvas(600, 400);
  // Start classifying
  // The sound model will continuously listen to the microphone
  classifier.classify(gotResult);
}

function draw() {
  background(247);
  // Draw the image and explanation text in the canvas
  image(pokerHandImage, 0, 0, width, height / 2);
  fill(0);
  textSize(18);
  textAlign(CENTER, CENTER);
  text(explanation, width / 2, height / 1.2);
}

// The model recognizing a sound will trigger this event
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  let label = results[0].label;

  // Load image based on label
  pokerHandImage = loadImage(`/static/hands/${label}.png`, imageLoaded);

  // Check for different poker hands
  if (label === "highcard") {
    explanation = "High Card: No matching cards.";
  } else if (label === "pair") {
    explanation = "Pair: Two cards of the same rank.";
  } else if (label === "twopair") {
    explanation = "Two Pair: Two sets of pairs.";
  } else if (label === "threeofakind") {
    explanation = "Three of a Kind: Three cards of the same rank.";
  } else if (label === "straight") {
    explanation = "Straight: Five consecutive cards.";
  } else if (label === "flush") {
    explanation = "Flush: Five cards of the same suit, not in sequence.";
  } else if (label === "fullhouse") {
    explanation = "Full House: Three of a kind plus a pair.";
  } else if (label === "fourofakind") {
    explanation = "Four of a Kind: Four cards of the same rank.";
  } else if (label === "straightflush") {
    explanation = "Straight Flush: Five consecutive cards of the same suit.";
  } else if (label === "royalflush") {
    explanation = "Royal Flush: A, K, Q, J, 10 of the same suit.";
  }
}

function imageLoaded() {
  redraw(); // Redraw the canvas once the image is loaded
}
