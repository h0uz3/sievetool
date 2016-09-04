## Synopsis

Sievetool is a utility that creates sieve rules to automatically move mails out of your INBOX when they arent sent from senders known to you. It does so by reading a list of mail addresses from your OwnCloud account and creating a move-rule into a given file.

## Requirements

In short: You need OwnCloud, a mail server that supports sieve and NodeJS.

## Installation

Go to the directory where you want to have sievetool setup and type
    git clone https://github.com/h0uz3/sievetool.git

Go into the directory and run `npm install`.

## Configuration

After installation, rename `config_template.js` to `config.js` and edit it according to your needs.

## Motivation

Main main email address is the catchall address for more than 50 domains. Therefore it receives an imperial fuckton of spam on a daily basis because no matter how good your spam filter is, it's never good enough.

Some mail clients support VIP-senders, but I switch between all kinds of mail programs all the time and wanted the server to handle this task.

## License

    Copyright (c) 2016 h0uz3

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
