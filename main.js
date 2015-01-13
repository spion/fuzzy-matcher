#!/usr/bin/env node

var match = require('./index');
var split = require('split');
var through = require('through');
var argv = require('yargs')
.demand(1)
.usage("Usage: input | $0 <query>")
.argv;

var data = [];

var key = argv._[0];

function n(){}
process.stdin.on('error', n)
    .pipe(split())
    .pipe(through(function(item, cb) {
        var s = match(key, item);
        if (s > 0) data.push({line: item, score: s});
    }, function() {
        var self = this;
        data.sort(compareScore).forEach(function(r) {
            self.push(r.line + '\n');
        });
    }))
    .pipe(process.stdout).on('error', n)

function compareScore(m1, m2) {
    return m2.score - m1.score;
}

